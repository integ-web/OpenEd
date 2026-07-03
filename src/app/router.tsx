import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";
import { AppShell } from "./AppShell";
import { useAuth, type OpenEdRole } from "./providers";
import { AuthPage } from "../features/auth/AuthPage";
import { AuthCallbackPage } from "../features/auth/AuthCallbackPage";
import { ForgotPasswordPage } from "../features/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "../features/auth/ResetPasswordPage";
import { CoursesPage } from "../features/courses/CoursesPage";
import { FmePublicPage } from "../features/courses/FmePublicPage";
import { EducatorCourseEditorPage } from "../features/educator/EducatorCourseEditorPage";
import { CourseCreationPage } from "../features/educator/CourseCreationPage";
import { EducatorDashboardPage } from "../features/educator/EducatorDashboardPage";
import { EducatorReviewStatusPage } from "../features/educator/EducatorReviewStatusPage";
import { PortfolioPage } from "../features/portfolio/PortfolioPage";
import { ProofReviewPage } from "../features/proof/ProofReviewPage";
import { LandingPage } from "../features/public/LandingPage";
import { ByokSettingsPage } from "../features/tutor/ByokSettingsPage";
import { TeamDashboardPage } from "../features/team/TeamDashboardPage";
import { TeamReviewQueuePage } from "../features/team/TeamReviewQueuePage";
import { NotFoundPage } from "../features/public/NotFoundPage";
import { sanitizeRedirectTarget } from "../shared/utils/authRedirects";

// --- New Course Imports ---
import { CourseProvider, useCourse } from "../features/course/CourseContext";
import { CourseLayout } from "../features/course/CourseLayout";
import { DashboardScreen } from "../features/course/screens/dashboard";
import { LearningMapScreen } from "../features/course/screens/learning-map";
import { ModuleIndexScreen } from "../features/course/screens/module-index";
import { ModuleDetailScreen } from "../features/course/screens/module-detail";
import { LessonScreen } from "../features/course/screens/lesson";
import { CaseStudyScreen } from "../features/course/screens/case-study";
import { SimulationScreen } from "../features/course/screens/simulation";
import { QuizScreen } from "../features/course/screens/quiz";
import { EvidenceLibraryScreen } from "../features/course/screens/evidence-library";
import { BenchmarkBuilderScreen } from "../features/course/screens/benchmark-builder";
import { RiskDashboardScreen } from "../features/course/screens/risk-dashboard";
import { PortfolioScreen } from "../features/course/screens/portfolio";
import { GlossaryScreen } from "../features/course/screens/glossary";
import { SourcesScreen } from "../features/course/screens/sources";
import { ContentQAScreen } from "../features/course/screens/content-qa";

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <section className="page-card narrow">
        <p className="eyebrow">Loading</p>
        <h1>Restoring your OpenEd session.</h1>
      </section>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function RoleRoute({ allowed }: { allowed: OpenEdRole[] }) {
  const { role } = useAuth();

  if (!allowed.includes(role)) {
    return <Navigate to={sanitizeRedirectTarget("/learn")} replace />;
  }

  return <Outlet />;
}

// Wrapper for the new course screens
function WithProps({ Screen }: { Screen: React.FC<any> }) {
  const { props } = useCourse();
  return <Screen {...props} />;
}

export const router = createBrowserRouter([
  // The new Learner platform (standalone shell)
  {
    path: "/learn",
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleRoute allowed={["learner", "educator", "opened_team"]} />,
        children: [
          {
            element: (
              <CourseProvider>
                <CourseLayout />
              </CourseProvider>
            ),
            children: [
              { index: true,         element: <WithProps Screen={DashboardScreen} /> },
              { path: "dashboard",   element: <WithProps Screen={DashboardScreen} /> },
              { path: "map",         element: <WithProps Screen={LearningMapScreen} /> },
              { path: "modules",     element: <WithProps Screen={ModuleIndexScreen} /> },
              { path: "module",      element: <WithProps Screen={ModuleDetailScreen} /> },
              { path: "module/:id",  element: <WithProps Screen={ModuleDetailScreen} /> },
              { path: "lesson",      element: <WithProps Screen={LessonScreen} /> },
              { path: "case-study",  element: <WithProps Screen={CaseStudyScreen} /> },
              { path: "simulation",  element: <WithProps Screen={SimulationScreen} /> },
              { path: "quiz",        element: <WithProps Screen={QuizScreen} /> },
              { path: "evidence",    element: <WithProps Screen={EvidenceLibraryScreen} /> },
              { path: "benchmark",   element: <WithProps Screen={BenchmarkBuilderScreen} /> },
              { path: "risk",        element: <WithProps Screen={RiskDashboardScreen} /> },
              { path: "portfolio",   element: <WithProps Screen={PortfolioScreen} /> },
              { path: "glossary",    element: <WithProps Screen={GlossaryScreen} /> },
              { path: "sources",     element: <WithProps Screen={SourcesScreen} /> },
              { path: "content-qa",  element: <WithProps Screen={ContentQAScreen} /> },
            ],
          },
        ],
      },
    ],
  },
  // The rest of the OpenEd app (using AppShell)
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/courses", element: <CoursesPage /> },
      { path: "/courses/fme", element: <FmePublicPage /> },
      { path: "/login", element: <AuthPage mode="login" /> },
      { path: "/signup", element: <AuthPage mode="signup" /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
      { path: "/auth/callback", element: <AuthCallbackPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <RoleRoute allowed={["learner", "educator", "opened_team"]} />,
            children: [
              { path: "/learn/portfolio", element: <PortfolioPage /> },
              { path: "/settings/byok", element: <ByokSettingsPage /> },
            ],
          },
          {
            element: <RoleRoute allowed={["educator", "opened_team"]} />,
            children: [
              { path: "/educator", element: <EducatorDashboardPage /> },
              { path: "/educator/proof-review", element: <ProofReviewPage /> },
              { path: "/educator/courses/new", element: <CourseCreationPage /> },
              { path: "/educator/courses/:courseId/edit", element: <EducatorCourseEditorPage /> },
              { path: "/educator/courses/:courseId/review-status", element: <EducatorReviewStatusPage /> },
            ],
          },
          {
            element: <RoleRoute allowed={["opened_team"]} />,
            children: [
              { path: "/team", element: <TeamDashboardPage /> },
              { path: "/team/review-queue", element: <TeamReviewQueuePage /> },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
], { basename: import.meta.env.BASE_URL });

import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import { AppShell } from "./AppShell";
import { AppProviders, useAuth, type OpenEdRole } from "./providers";
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
import { LearnerDashboardPage } from "../features/learner/LearnerDashboardPage";
import { CourseLayout } from "../features/course/CourseLayout";
import { CourseProvider, useCourse } from "../features/course/CourseContext";
import { PortfolioPage } from "../features/portfolio/PortfolioPage";
import { ProofReviewPage } from "../features/proof/ProofReviewPage";
import { LandingPage } from "../features/public/LandingPage";
import { ByokSettingsPage } from "../features/tutor/ByokSettingsPage";
import { TeamDashboardPage } from "../features/team/TeamDashboardPage";
import { TeamReviewQueuePage } from "../features/team/TeamReviewQueuePage";
import { NotFoundPage } from "../features/public/NotFoundPage";
import { sanitizeRedirectTarget } from "../shared/utils/authRedirects";
import { CapstoneStudio } from "../features/capstone/CapstoneStudio";
import { CapstoneProvider } from "../features/capstone/CapstoneContext";
import { C } from "../features/fme/types";

// FME Screens
import { LandingScreen } from "../features/course/screens/landing";
import { OnboardingScreen } from "../features/course/screens/onboarding";
import { DiagnosticScreen } from "../features/course/screens/diagnostic";
import { CertificateScreen } from "../features/course/screens/certificate";
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

function WithProps({ Screen }: { Screen: React.FC<any> }) {
  const { props } = useCourse();
  return <Screen {...props} />;
}

function FullScreenWrapper({ Screen }: { Screen: React.FC<any> }) {
  const { props, state } = useCourse();
  const c = C(state.dark);
  return (
    <div style={{ minHeight: '100vh', background: c.bg, overflowY: 'auto' }}>
      <Screen {...props} />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <AppProviders><Outlet /></AppProviders>,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/learn/courses/fme",
            element: <RoleRoute allowed={["learner", "educator", "opened_team"]} />,
            children: [
              {
                path: "",
                element: (
                  <CourseProvider>
                    <Outlet />
                  </CourseProvider>
                ),
                children: [
                  { index: true, element: <FullScreenWrapper Screen={LandingScreen} /> },
                  { path: "onboarding", element: <FullScreenWrapper Screen={OnboardingScreen} /> },
                  { path: "diagnostic", element: <FullScreenWrapper Screen={DiagnosticScreen} /> },
                  { path: "certificate", element: <FullScreenWrapper Screen={CertificateScreen} /> },
                  {
                    element: <CourseLayout />,
                    children: [
                      { path: "course/dashboard", element: <WithProps Screen={DashboardScreen} /> },
                      { path: "course/map", element: <WithProps Screen={LearningMapScreen} /> },
                      { path: "course/modules", element: <WithProps Screen={ModuleIndexScreen} /> },
                      { path: "course/module", element: <WithProps Screen={ModuleDetailScreen} /> },
                      { path: "course/lesson", element: <WithProps Screen={LessonScreen} /> },
                      { path: "course/case-study", element: <WithProps Screen={CaseStudyScreen} /> },
                      { path: "course/simulation", element: <WithProps Screen={SimulationScreen} /> },
                      { path: "course/quiz", element: <WithProps Screen={QuizScreen} /> },
                      { path: "course/evidence", element: <WithProps Screen={EvidenceLibraryScreen} /> },
                      { path: "course/benchmark", element: <WithProps Screen={BenchmarkBuilderScreen} /> },
                      { path: "course/risk", element: <WithProps Screen={RiskDashboardScreen} /> },
                      { path: "course/portfolio", element: <WithProps Screen={PortfolioScreen} /> },
                      { path: "course/glossary", element: <WithProps Screen={GlossaryScreen} /> },
                      { path: "course/sources", element: <WithProps Screen={SourcesScreen} /> },
                      { path: "course/content-qa", element: <WithProps Screen={ContentQAScreen} /> },
                    ]
                  }
                ],
              },
            ],
          },
        ],
      },
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
                  { path: "/learn", element: <LearnerDashboardPage /> },
                  { path: "/learn/portfolio", element: <PortfolioPage /> },
                  { path: "/settings/byok", element: <ByokSettingsPage /> },
                  { path: "/capstone", element: <CapstoneProvider><CapstoneStudio /></CapstoneProvider> },
                  { path: "/capstone/:section", element: <CapstoneProvider><CapstoneStudio /></CapstoneProvider> },
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
    ]
  }
], { basename: import.meta.env.BASE_URL });

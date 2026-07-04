import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
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
import { LearnerDashboardPage } from "../features/learner/LearnerDashboardPage";
import { CourseLayout } from "../features/course/CourseLayout";
import { CourseProvider } from "../features/course/CourseContext";
import { PortfolioPage } from "../features/portfolio/PortfolioPage";
import { ProofReviewPage } from "../features/proof/ProofReviewPage";
import { LandingPage } from "../features/public/LandingPage";
import { ByokSettingsPage } from "../features/tutor/ByokSettingsPage";
import { TeamDashboardPage } from "../features/team/TeamDashboardPage";
import { TeamReviewQueuePage } from "../features/team/TeamReviewQueuePage";
import { NotFoundPage } from "../features/public/NotFoundPage";
import { sanitizeRedirectTarget } from "../shared/utils/authRedirects";
import { CapstoneStudio } from "../features/capstone/CapstoneStudio";

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

export const router = createBrowserRouter([
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
                <CourseLayout />
              </CourseProvider>
            ),
          }
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
              { path: "/capstone", element: <CapstoneStudio /> },
              { path: "/capstone/:section", element: <CapstoneStudio /> },
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

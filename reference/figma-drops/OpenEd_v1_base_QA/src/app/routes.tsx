import React from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { CapstoneProvider } from "./components/capstone/CapstoneContext";
import { CourseProvider } from "./components/course/CourseContext";
import { CourseLayout } from "./components/course/CourseLayout";
import { CapstoneStudio } from "./components/capstone/CapstoneStudio";
import { C } from "./components/fme/types";
import { useCourse } from "./components/course/CourseContext";
import { AuthProvider } from "./components/auth/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Auth screens
import { LoginScreen }          from "./components/auth/LoginScreen";
import { SignUpScreen }          from "./components/auth/SignUpScreen";
import { ForgotPasswordScreen }  from "./components/auth/ForgotPasswordScreen";
import { AuthCallbackScreen }    from "./components/auth/AuthCallbackScreen";

// Full-screen screens
import { LandingScreen }    from "./components/course/screens/landing";
import { OnboardingScreen } from "./components/course/screens/onboarding";
import { DiagnosticScreen } from "./components/course/screens/diagnostic";
import { CertificateScreen }from "./components/course/screens/certificate";

// Shell screens
import { DashboardScreen }       from "./components/course/screens/dashboard";
import { LearningMapScreen }     from "./components/course/screens/learning-map";
import { ModuleIndexScreen }     from "./components/course/screens/module-index";
import { ModuleDetailScreen }    from "./components/course/screens/module-detail";
import { LessonScreen }          from "./components/course/screens/lesson";
import { CaseStudyScreen }       from "./components/course/screens/case-study";
import { SimulationScreen }      from "./components/course/screens/simulation";
import { QuizScreen }            from "./components/course/screens/quiz";
import { EvidenceLibraryScreen } from "./components/course/screens/evidence-library";
import { BenchmarkBuilderScreen }from "./components/course/screens/benchmark-builder";
import { RiskDashboardScreen }   from "./components/course/screens/risk-dashboard";
import { PortfolioScreen }       from "./components/course/screens/portfolio";
import { GlossaryScreen }        from "./components/course/screens/glossary";
import { SourcesScreen }         from "./components/course/screens/sources";
import { ContentQAScreen }       from "./components/course/screens/content-qa";

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

function Root() {
  return (
    <AuthProvider>
      <CapstoneProvider>
        <CourseProvider>
          <Outlet />
        </CourseProvider>
      </CapstoneProvider>
    </AuthProvider>
  );
}

function ProtectedCourseLayout() {
  return (
    <ProtectedRoute>
      <CourseLayout />
    </ProtectedRoute>
  );
}

function ProtectedFullScreen({ Screen }: { Screen: React.FC<any> }) {
  const { props, state } = useCourse();
  const c = C(state.dark);
  return (
    <ProtectedRoute>
      <div style={{ minHeight: '100vh', background: c.bg, overflowY: 'auto' }}>
        <Screen {...props} />
      </div>
    </ProtectedRoute>
  );
}

function ProtectedCapstone() {
  return (
    <ProtectedRoute>
      <CapstoneStudio />
    </ProtectedRoute>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#020617', fontFamily: '"IBM Plex Mono", monospace', color: '#94A3B8' }}>
      <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: 8 }}>404</p>
      <p style={{ fontSize: 14 }}>Page not found</p>
      <a href="/" style={{ marginTop: 16, fontSize: 12, color: '#60A5FA' }}>Return to course</a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      // Public routes
      { index: true,               element: <FullScreenWrapper Screen={LandingScreen} /> },
      { path: "login",             Component: LoginScreen },
      { path: "signup",            Component: SignUpScreen },
      { path: "forgot-password",   Component: ForgotPasswordScreen },
      { path: "auth/callback",     Component: AuthCallbackScreen },
      { path: "onboarding",        element: <FullScreenWrapper Screen={OnboardingScreen} /> },
      { path: "diagnostic",        element: <FullScreenWrapper Screen={DiagnosticScreen} /> },

      // Protected full-screen routes
      { path: "certificate",       element: <ProtectedFullScreen Screen={CertificateScreen} /> },

      // Protected course shell
      {
        path: "course",
        Component: ProtectedCourseLayout,
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

      // Protected capstone
      { path: "capstone",          Component: ProtectedCapstone },
      { path: "capstone/:section", Component: ProtectedCapstone },

      { path: "*", Component: NotFound },
    ],
  },
]);

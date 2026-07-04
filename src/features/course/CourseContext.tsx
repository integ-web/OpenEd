import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate as useRouterNavigate } from 'react-router-dom';
import { INITIAL_STATE, type CourseState, type ScreenId, type ScreenProps } from './course-types';
import { useAuth } from "../../app/providers";

export const SCREEN_PATHS: Record<ScreenId, string> = {
  landing:      '/learn/courses/fme',
  onboarding:   '/learn/courses/fme/onboarding',
  diagnostic:   '/learn/courses/fme/diagnostic',
  dashboard:    '/learn/courses/fme/course/dashboard',
  map:          '/learn/courses/fme/course/map',
  modules:      '/learn/courses/fme/course/modules',
  module:       '/learn/courses/fme/course/module',
  lesson:       '/learn/courses/fme/course/lesson',
  'case-study': '/learn/courses/fme/course/case-study',
  simulation:   '/learn/courses/fme/course/simulation',
  quiz:         '/learn/courses/fme/course/quiz',
  evidence:     '/learn/courses/fme/course/evidence',
  benchmark:    '/learn/courses/fme/course/benchmark',
  risk:         '/learn/courses/fme/course/risk',
  capstone:     '/capstone',
  portfolio:    '/learn/courses/fme/course/portfolio',
  certificate:  '/learn/courses/fme/certificate',
  glossary:     '/learn/courses/fme/course/glossary',
  sources:      '/learn/courses/fme/course/sources',
  'content-qa': '/learn/courses/fme/course/content-qa',
};

export const PATH_TO_SCREEN: Record<string, ScreenId> = Object.fromEntries(
  Object.entries(SCREEN_PATHS).map(([k, v]) => [v, k as ScreenId])
) as Record<string, ScreenId>;

interface CourseContextValue {
  state: CourseState;
  navigate: (screen: ScreenId) => void;
  update: (updates: Partial<CourseState>) => void;
  props: ScreenProps;
}

const CourseContext = createContext<CourseContextValue | null>(null);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CourseState>(INITIAL_STATE);
  const routerNavigate = useRouterNavigate();
  const { user } = useAuth();

  // Sync learner name from auth user metadata
  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      const firstName = user.user_metadata.full_name.split(' ')[0];
      setState(s => {
        // Only update if the name hasn't been customized through onboarding
        if (s.learnerName === 'Alex' || s.learnerName === 'Learner') {
          return { ...s, learnerName: firstName };
        }
        return s;
      });
    }
  }, [user]);

  const navigate = useCallback((screen: ScreenId) => {
    setState(s => ({ ...s, screen }));
    const path = SCREEN_PATHS[screen];
    if (path) routerNavigate(path);
  }, [routerNavigate]);

  const update = useCallback((updates: Partial<CourseState>) => {
    setState(s => ({ ...s, ...updates }));
  }, []);

  const props: ScreenProps = { state, navigate, update };

  return (
    <CourseContext.Provider value={{ state, navigate, update, props }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse(): CourseContextValue {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error('useCourse must be used inside CourseProvider');
  return ctx;
}


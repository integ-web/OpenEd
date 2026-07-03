import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate as useRouterNavigate } from 'react-router';
import { INITIAL_STATE, type CourseState, type ScreenId, type ScreenProps } from './course-types';
import { useAuth } from '../../app/providers';

export const SCREEN_PATHS: Record<ScreenId, string> = {
  landing:      '/',
  onboarding:   '/onboarding',
  diagnostic:   '/diagnostic',
  dashboard:    '/learn/dashboard',
  map:          '/learn/map',
  modules:      '/learn/modules',
  module:       '/learn/module',
  lesson:       '/learn/lesson',
  'case-study': '/learn/case-study',
  simulation:   '/learn/simulation',
  quiz:         '/learn/quiz',
  evidence:     '/learn/evidence',
  benchmark:    '/learn/benchmark',
  risk:         '/learn/risk',
  capstone:     '/capstone/brief',
  portfolio:    '/learn/portfolio',
  certificate:  '/certificate',
  glossary:     '/learn/glossary',
  sources:      '/learn/sources',
  'content-qa': '/learn/content-qa',
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

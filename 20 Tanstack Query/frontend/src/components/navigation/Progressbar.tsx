import 'nprogress/nprogress.css';
import './ProgressBar.css';

import NProgress from 'nprogress';
import { useEffect } from 'react';

import { useRouterState } from '@tanstack/react-router';

export function useProgressBar() {
  const { isLoading } = useRouterState();

  // https://ricostacruz.com/nprogress https://www.npmjs.com/package/nprogress
  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
  }, [isLoading]);
}

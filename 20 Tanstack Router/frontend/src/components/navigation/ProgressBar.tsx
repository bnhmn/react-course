import 'nprogress/nprogress.css';
import './ProgressBar.css';

import NProgress from 'nprogress';
import { useEffect } from 'react';

/**
 * Show an indeterminate progress bar while the page is loading.
 * @param isLoading: Whether the page is loading or not.
 * @param delayMs: Only shows the progress bar if the page takes longer to load than specified here.
 */
export function useProgressBar(isLoading = false, delayMs = 200) {
  // https://ricostacruz.com/nprogress https://www.npmjs.com/package/nprogress
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(NProgress.start, delayMs);
      return () => {
        clearTimeout(timer);
        NProgress.done();
      };
    } else {
      NProgress.done();
    }
  }, [isLoading, delayMs]);
}

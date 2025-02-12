import 'nprogress/nprogress.css';
import './Progressbar.css';

import NProgress from 'nprogress';
import { useEffect } from 'react';
import { useNavigation } from 'react-router';

export function useProgressbar() {
  const navigation = useNavigation();

  // https://ricostacruz.com/nprogress https://www.npmjs.com/package/nprogress
  useEffect(() => {
    if (navigation.state === 'loading') {
      NProgress.start();
    } else {
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
  }, [navigation.state]);
}

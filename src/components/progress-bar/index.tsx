import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {useLocation} from '@tanstack/react-router'
import React, { useEffect, useState } from 'react';

import { useThemeToken } from '#wf-local/theme/hooks';

export const ProgressBar: React.FC = () => {
  const { pathname } = useLocation();
  const { colorPrimary } = useThemeToken();

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      NProgress.configure({
        showSpinner: false,
      });
      NProgress.start();
      changeNprogressBar();
      setVisible(true);
    }

    if (visible) {
      NProgress.done();
      setVisible(false);
    }

    if (!visible && mounted) {
      setVisible(false);
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
  }, [pathname, mounted]);

  const changeNprogressBar = () => {
    const nprogress = document.getElementById('nprogress');
    if (nprogress) {
      const bar: HTMLElement = nprogress.querySelector('.bar')!;
      const peg: HTMLElement = nprogress.querySelector('.peg')!;

      bar.style.background = colorPrimary;
      bar.style.boxShadow = `0 0 2px ${colorPrimary}`;

      peg.style.boxShadow = `0 0 10px ${colorPrimary}, 0 0 5px ${colorPrimary}`;
    }
  };
  return null;
}

export default ProgressBar;

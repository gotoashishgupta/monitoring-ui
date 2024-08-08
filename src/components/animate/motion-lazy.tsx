import React from 'react';
import { LazyMotion, m, domMax } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}
/**
 * [Reduce bundle size by lazy-loading a subset of Motion's features](https://www.framer.com/motion/lazy-motion/)
 */
export const MotionLazy: React.FC<Props> = ({ children }: Props) => {
  return (
    <LazyMotion strict features={domMax}>
      <m.div style={{ height: '100%' }}> {children} </m.div>
    </LazyMotion>
  );
}

export default MotionLazy;

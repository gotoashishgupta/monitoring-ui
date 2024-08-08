import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { m, MotionProps } from 'framer-motion';

import { varContainer } from './variants/container';

interface Props extends MotionProps {
  className?: string;
}

export const MotionContainer: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <m.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      className={className}
    >
      {children}
    </m.div>
  );
}

export default MotionContainer;

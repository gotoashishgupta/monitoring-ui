import { MotionProps, m } from 'framer-motion';
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { varContainer } from './variants';

interface Props extends MotionProps {
  className?: string;
}

export const MotionViewport: React.FC = ({ children, className, ...other }: Props) => {
  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      className={className}
      {...other}
    >
      {children}
    </m.div>
  );
}

export default MotionViewport;

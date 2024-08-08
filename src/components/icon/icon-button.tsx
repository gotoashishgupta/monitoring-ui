import { ButtonProps } from 'antd';
import React, { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & ButtonProps;

export const IconButton: React.FC<Props> = ({ children, className, style, onClick }: Props) => {
  return (
    <button
      style={style}
      className={`flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;

import { Icon, type IconProps } from '@iconify/react';
import styled from 'styled-components';
import React from 'react';


interface Props extends IconProps {
  size?: IconProps['width'];
}


const StyledIconify = styled.div`
  display: inline-flex;
  vertical-align: middle;
  svg {
    display: inline-block;
  }
`;


export const Iconify: React.FC<Props> = ({ icon, size = '1em', className = '', ...other }: Props) => {
  return (
    <StyledIconify className="anticon">
      <Icon icon={icon} width={size} height={size} className={`m-auto ${className}`} {...other} />
    </StyledIconify>
  );
}

export default Iconify;

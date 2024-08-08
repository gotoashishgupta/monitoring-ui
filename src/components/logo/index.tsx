import { Link } from '@tanstack/react-router';

import { useThemeToken } from '#wf-local/theme/hooks';

import { Iconify } from '../icon';

interface Props {
  size?: number | string;
}
export const Logo: React.FC<Props> = ({ size = 50 }: Props) => {
  const { colorPrimary } = useThemeToken();

  return (
    <Link to="/">
      <Iconify icon="solar:code-square-bold" color={colorPrimary} size={size} />
    </Link>
  );
}

export default Logo;

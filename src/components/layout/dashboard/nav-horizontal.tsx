import { Menu, MenuProps } from 'antd';
import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { useLocation, useMatches, useNavigate } from '@tanstack/react-router';

import { flattenMenuRoutes } from '#wf-local/common/routes';
import { useThemeToken } from '#wf-local/theme/hooks';

import { NAV_HORIZONTAL_HEIGHT } from './config';
import useNavMenuElements from '#wf-local/hooks/useNavMenuElements';
import { useNavMenu } from '#wf-local/store/navMenuStore';

export const NavHorizontal: React.FC = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const { colorBgElevated } = useThemeToken();
  const menuStyle: CSSProperties = {
    background: colorBgElevated,
  };


  const navMenu = useNavMenu();
  const navMenuElementsFn = useNavMenuElements();
  const menuList = useMemo(() => {
    return navMenuElementsFn(navMenu);
  }, [navMenuElementsFn, navMenu]);
  const flattenedRoutes = flattenMenuRoutes(navMenu);

  /**
   * state
   */
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname, matches]);

  /**
   * events
   */
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };
  const onClick: MenuProps['onClick'] = ({key}) => {
    const nextLink = flattenedRoutes?.find((el) => el.id === key);

    if (nextLink?.hideTab && nextLink?.frameSrc) {
      window.open(nextLink?.frameSrc, '_blank');
      return;
    }
    navigate({to: nextLink.route});
  };


  return (
    <div className="w-screen" style={{ height: NAV_HORIZONTAL_HEIGHT }}>
      <Menu
        mode="horizontal"
        items={menuList}
        className="!z-10 !border-none"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClick}
        style={menuStyle}
      />
    </div>
  );
}


export default NavHorizontal;

import { Menu, MenuProps } from 'antd';
import { useState, useEffect, CSSProperties, useMemo } from 'react';
import { useNavigate, useMatches, useLocation } from '@tanstack/react-router';

import { useRouteToMenuFn, useNavMenuRoutes, useFlattenedRoutes } from '#wf-local/hooks';
import { menuFilter } from '#wf-local/common/routes';
import { useThemeToken } from '#wf-local/theme/hooks';

import { NAV_HORIZONTAL_HEIGHT } from './config';

export default function NavHorizontal() {
  const navigate = useNavigate();
  const matches = useMatches();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const { colorBgElevated } = useThemeToken();

  const routeToMenuFn = useRouteToMenuFn();
  const navMenuRoutes = useNavMenuRoutes();
  const menuList = useMemo(() => {
    const menuRoutes = menuFilter(navMenuRoutes);
    return routeToMenuFn(menuRoutes);
  }, [routeToMenuFn, navMenuRoutes]);

  const flattenedRoutes = useFlattenedRoutes();

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
  const onClick: MenuProps['onClick'] = ({ key }) => {
    const nextLink = flattenedRoutes?.find((el) => el.key === key);

    if (nextLink?.hideTab && nextLink?.frameSrc) {
      window.open(nextLink?.frameSrc, '_blank');
      return;
    }
    navigate({to: key});
  };

  const menuStyle: CSSProperties = {
    background: colorBgElevated,
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

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Color from 'color';
import { m } from 'framer-motion';
import { Menu, MenuProps } from 'antd';
import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { useLocation, useMatches, useNavigate } from '@tanstack/react-router';

import MotionContainer from '#wf-local/components/animate/motion-container';
import { varSlide } from '#wf-local/components/animate/variants';
import Logo from '#wf-local/components/logo';
import Scrollbar from '#wf-local/components/scrollbar';
import { flattenMenuRoutes } from '#wf-local/common/routes';
import { useSettingActions, useSettings } from '#wf-local/store/settingStore';
import { useThemeToken } from '#wf-local/theme/hooks';

import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config';

import { ThemeLayout } from '#wf-types/enum';
import { useNavMenu } from '#wf-local/store/navMenuStore';
import {useNavMenuElements} from '#wf-local/hooks/useNavMenuElements';

const slideInLeft = varSlide({ distance: 10 }).inLeft;

interface Props {
  closeSideBarDrawer?: () => void;
}
export const Nav: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const matches = useMatches();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const { colorPrimary, colorTextBase, colorBgElevated, colorBorder } = useThemeToken();
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
  const [collapsed, setCollapsed] = useState(false);
  const [menuMode, setMenuMode] = useState<MenuProps['mode']>('inline');
  const settings = useSettings();
  const { themeLayout } = settings;
  const { setSettings } = useSettingActions();


  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      const openKeys = matches
        .filter((match) => match.pathname !== '/')
        .map((match) => match.pathname);
      setOpenKeys(openKeys);
    }
  }, [matches, themeLayout]);

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      setCollapsed(false);
      setMenuMode('inline');
    }
    if (themeLayout === ThemeLayout.Mini) {
      setCollapsed(true);
      setMenuMode('inline');
    }
  }, [themeLayout]);

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
    props?.closeSideBarDrawer?.();
  };

  const setThemeLayout = (themeLayout: ThemeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    });
  };

  const toggleCollapsed = () => {
    if (!collapsed) {
      setThemeLayout(ThemeLayout.Mini);
    } else {
      setThemeLayout(ThemeLayout.Vertical);
    }
    setCollapsed(!collapsed);
  };

  return (
    <div
      className="flex h-full flex-col"
      style={{
        width: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
        borderRight: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,
      }}
    >
      <div className="relative flex h-20 items-center justify-center py-4">
        <MotionContainer className="flex items-center">
          <Logo />
          {themeLayout !== ThemeLayout.Mini && (
            <m.div variants={slideInLeft}>
              <span className="ml-2 text-xl font-bold" style={{ color: colorPrimary }}>
                GST DevOps
              </span>
            </m.div>
          )}
        </MotionContainer>
        <button
          onClick={toggleCollapsed}
          className="absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center !text-gray md:block"
          style={{ color: colorTextBase, borderColor: colorTextBase, fontSize: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined size={20} /> : <MenuFoldOutlined size={20} />}
        </button>
      </div>

      <Scrollbar
        style={{
          height: 'calc(100vh - 70px)',
        }}
      >
        {/* <!-- Sidebar Menu --> */}
        <Menu
          mode={menuMode}
          items={menuList}
          className="h-full !border-none"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={[pathname]}
          selectedKeys={[pathname]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={onClick}
          style={menuStyle}
          inlineCollapsed={collapsed}
        />
      </Scrollbar>
    </div>
  );
}


export default Nav;

import { Divider, MenuProps } from 'antd';
import Dropdown, { DropdownProps } from 'antd/es/dropdown/dropdown';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { IconButton } from '#wf-local/components/icon';
import { useLoginStateContext, LoginStateEnum } from '#wf-local/providers/LoginStateProvider';
import {useAuth} from '#wf-local/hooks/useAuth';
import { useRoute } from '#wf-local/hooks/useRoute';
import { useUserInfo, useUserActions } from '#wf-local/store/userStore';
import { useThemeToken } from '#wf-local/theme/hooks';

let { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

HOMEPAGE = HOMEPAGE.replace(/"/gi, '');

/**
 * Account Dropdown
 */
export const AccountDropdown: React.FC = () => {


  const { loginState, setLoginState } = useLoginStateContext();
  const { signIn, signOut, isLoggedIn } = useAuth();


  const { replace } = useRoute();
  const { backToLogin } = useLoginStateContext();
  const { t } = useTranslation();

  const logout = () => {
    try {
      signOut();
      backToLogin();
    } catch (error) {
      console.log(error);
    } finally {
      replace('/m/login');
    }
  };
  const { colorBgElevated, borderRadiusLG, boxShadowSecondary } = useThemeToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  const dropdownRender: DropdownProps['dropdownRender'] = (menu) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>Hello User</div>
        <div className="text-gray">test.user@wayfair.com</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
  );

  const items: MenuProps['items'] = [
    { label: <Link to={HOMEPAGE}>{t('sys.menu.dashboard')}</Link>, key: '0' },
    { type: 'divider' },
    {
      label: <button className="font-bold text-warning">{t('sys.login.logout')}</button>,
      key: '1',
      onClick: logout,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} dropdownRender={dropdownRender}>
      <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
        <img className="h-8 w-8 rounded-full" src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/331.jpg" alt="" />
      </IconButton>
    </Dropdown>
  );
}


export default AccountDropdown;

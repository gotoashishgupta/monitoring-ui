import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from '@tanstack/react-router';

import { Iconify } from '#wf-local/components/icon';
import { useFlattenedRoutes, useNavMenuRoutes } from '#wf-local/hooks';
import { flattenMenuRoutes, menuFilter } from '#wf-local/common/routes';

import { AppRouteObject } from '#wf-types/router';
import { useNavMenu } from '#wf-local/store/navMenuStore';
import useNavMenuElements from '#wf-local/hooks/useNavMenuElements';

type BreadcrumbItem = {
  id: string;
  parentId?: string;
  title: string | React.ReactElement;
  menu?: {
    items: { key: string }[];
  };
};

export const BreadCrumb: React.FC = () => {
  const { t } = useTranslation();
  const {pathname} = useLocation();
  const [breadCrumbs, setBreadCrumbs] = useState<ItemType[]>([]);

  const navMenu = useNavMenu();
  const flattenedRoutes = flattenMenuRoutes(navMenu);

  useEffect(() => {
    let bc = flattenedRoutes?.find((el) => el.route === pathname);

    let breadCrumbs: BreadcrumbItem[] = [{
      id: bc.id,
      parentId: bc.parentId ?? 0,
      title: t(bc.label)
    }]

    while(bc?.parentId) {
      bc = flattenedRoutes?.find((el) => el.id === bc.parentId);
      if(!bc) {
        break;
      }
      let menuItems = []
      if(bc?.children?.length) {
        menuItems = bc.children.map((x) => {
          return {
            id: x.id,
            parentId: x.parentId,
            title: <Link to={x.route}>{t(x.label)}</Link>
          }
        })
      }
      let penultimateBc: BreadcrumbItem = {
        id: bc.id,
        parentId: bc.parentId ?? 0,
        title: <Link to={bc.route}>{t(bc.label)}</Link>
      }
      if(menuItems.length) {
        penultimateBc.menu = {
          items: menuItems
        }
      }
      breadCrumbs = [penultimateBc, ...breadCrumbs]
    }
    console.log(`breadCrumbs`, breadCrumbs)
    setBreadCrumbs(breadCrumbs);
  }, [pathname]);

  return (
    <Breadcrumb
      items={breadCrumbs}
      className="!text-sm"
      separator={<Iconify icon="ph:dot-duotone" />}
    />
  );
}

export default BreadCrumb;

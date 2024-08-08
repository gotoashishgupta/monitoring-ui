import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches, Link } from '@tanstack/react-router';

import { Iconify } from '#wf-local/components/icon';
import { useFlattenedRoutes, useNavMenuRoutes } from '#wf-local/hooks';
import { menuFilter } from '#wf-local/common/routes';

import { AppRouteObject } from '#wf-types/router';

export const BreadCrumb: React.FC = () => {
  const { t } = useTranslation();
  const matches = useMatches();
  const [breadCrumbs, setBreadCrumbs] = useState<ItemType[]>([]);

  const flattenedRoutes = useFlattenedRoutes();
  const navMenuRoutes = useNavMenuRoutes();

  useEffect(() => {
    const menuRoutes = menuFilter(navMenuRoutes);
    const paths = matches.filter((item) => item.pathname !== '/').map((item) => item.pathname);

    const pathRouteMetas = flattenedRoutes.filter((item) => paths.indexOf(item.key) !== -1);

    let items: AppRouteObject[] | undefined = [...menuRoutes];
    const breadCrumbs = pathRouteMetas.map((routeMeta) => {
      const { key, label } = routeMeta;
      items = items!
        .find((item) => item.meta?.key === key)
        ?.children?.filter((item) => !item.meta?.hideMenu);
      const result: ItemType = {
        key,
        title: t(label),
      };
      if (items) {
        result.menu = {
          items: items.map((item) => ({
            key: item.meta?.key,
            label: <Link to={item.meta!.key!}>{t(item.meta!.label)}</Link>,
          })),
        };
      }
      return result;
    });
    setBreadCrumbs(breadCrumbs);
  }, [matches, flattenedRoutes, t, navMenuRoutes]);

  return (
    <Breadcrumb
      items={breadCrumbs}
      className="!text-sm"
      separator={<Iconify icon="ph:dot-duotone" />}
    />
  );
}

export default BreadCrumb;

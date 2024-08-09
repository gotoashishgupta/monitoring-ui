import React, { memo } from "react";
import { Outlet } from "@tanstack/react-router";
import { Flex, Layout } from 'antd';

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden'
};

export const NonAuthLayout: React.FC = memo(() => {
  return (
    <Flex gap="middle" wrap className="flex h-dvh overflow-hidden">
      <Layout style={layoutStyle}>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Flex>
  );
});

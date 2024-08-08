import { App as AntdApp } from 'antd';
import type { FunctionComponent } from "#wf-local/common/types";
import AntdConfig from '#wf-local/theme/antd';
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from './hooks/useAuth';
import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import { MotionLazy } from './components/animate/motion-lazy';
import {queryClient} from '#wf-local/common/queryClient';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    authService: undefined,
    queryClient
  }
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


const App = (): FunctionComponent => {

  const authService = useAuth();

	return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Helmet>
            <title>GST DevOps</title>
          </Helmet>
          {/* <RouterProvider router={router}> */}
          <RouterProvider router={router} context={{authService, queryClient}}>
            <TanStackRouterDevtools
              router={router}
              initialIsOpen={true}
              position="bottom-right"
            />
          </RouterProvider>
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
	);
};

export default App;

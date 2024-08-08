import React, { memo } from "react";
import { Outlet } from "@tanstack/react-router";

export const NonAuthLayout: React.FC = memo(() => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-dvh overflow-hidden">
      <div className="relative flex flex-1 flex-col overflow-x-hidden">
          <Outlet />
      </div>
    </div>
  );
});

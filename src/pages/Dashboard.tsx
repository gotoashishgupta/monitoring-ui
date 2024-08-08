import { navMenuQueryOptions } from "#wf-local/common/queryOptions";
import Header from "#wf-local/components/ui/Header";
import Sidebar from "#wf-local/components/ui/Sidebar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import React from "react";

export const Dashboard: React.FC = () => {
	const data = useSuspenseQuery(navMenuQueryOptions);
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1">
				<Header />
				<div className="p-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

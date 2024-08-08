import Header from "#wf-local/components/ui/Header";
import Sidebar from "#wf-local/components/ui/Sidebar";
import { Outlet } from "@tanstack/react-router";
import React from "react";

export const Dashboard: React.FC = () => {
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

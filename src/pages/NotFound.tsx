import { Link } from "@tanstack/react-router";
import { Result } from "antd";
import React from "react";

export const PageNotFound: React.FC = () => (
	<Result
		status="404"
		title="404"
		subTitle="Sorry, the page you visited does not exist."
		extra={
			<Link
				to="/"
				className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Back Home
			</Link>
		}
	/>
);

export default PageNotFound;

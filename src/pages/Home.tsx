import { useQuery } from "@tanstack/react-query";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "../components/layout/Loading";
import LogsContainer from "../components/layout/LogsContainer";
import MilestonesSidebar from "../components/layout/MilestonesSidebar";
import { getStatus } from "../repositories/status";
import { IStatus, setGlobalStore } from "../store/index";

export const Home: React.FC = (): JSX.Element => {
	const { service, status, setStatus, setService } = setGlobalStore();
	const [inputValue, setInputValue] = useState(service);

	// Fetch data using useQuery
	const { isPending, isError, data, error, isSuccess } = useQuery({
		queryKey: ["init", { service }],
		queryFn: getStatus,
		refetchInterval: 5000,
	});

	useEffect(() => {
		setInputValue(service);
		if (isSuccess) {
			console.info(
				`Setting status ${service} pending: ${isPending}, success: ${isSuccess}...`
			);
			const newStatus = { ...status, ...{ [service]: data } } as IStatus;
			setStatus(newStatus);
		}
	}, [isSuccess, service, data, isPending, setStatus]);

	if (isPending) {
		console.info("Polling service status...");
	}

	if (isError) {
		console.error(`Error: ${error.message}`);
	}

	const handleSubmit = () => {
		setService(inputValue);
	};

	return (
		<div className="h-screen bg-gray-100 flex">
			<aside className="w-64 bg-white p-4 border-l border-gray-300">
				<Suspense fallback={<Loading />}>
					<MilestonesSidebar />
				</Suspense>
			</aside>
			<main className="flex-1 p-4 h-full]">
				<div className="flex items-center justify-between mb-4">
					<div className="relative flex-grow mr-2">
						<input
							type="text"
							placeholder="Git repo to process..."
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							className="w-full py-2 px-4 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 hover:border-gray-500 transition duration-200"
						/>
					</div>
					<button
						onClick={handleSubmit}
						className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
					>
						Go
					</button>
				</div>
				<header className="bg-blue-600 text-sky-300 p-4 mb-4">
					<h1 className="text-2xl">
						AI Progress of <span className="text-white">{service}</span>
					</h1>
				</header>
				<Suspense fallback={<Loading />}>
					<LogsContainer />
				</Suspense>
			</main>
		</div>
	);
};

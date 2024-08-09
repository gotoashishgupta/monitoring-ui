import { aiStatusQueryOptions } from "#wf-local/common/queryOptions";
import { Iconify } from "#wf-local/components/icon";
import LogsContainer from "#wf-local/components/layout/LogsContainer";
import {
	IStatus,
	ITask,
	ITaskGroup,
	useGlobalStore,
} from "#wf-local/store/index";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
	Card,
	Flex,
	Input,
	Progress,
	Skeleton,
	Space,
	Spin,
	Tabs,
	Typography,
} from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
const { Text } = Typography;
const { Search } = Input;

export interface IMilestone {
	id: number;
	title: string;
	status: string;
	tasks?: ITask[];
}

const initialMilestones: IMilestone[] = [
	{ id: 1, title: "Milestone 1", status: "Completed" },
	{ id: 2, title: "Milestone 2", status: "In Progress" },
	{ id: 3, title: "Milestone 3", status: "Not Started" },
	{ id: 4, title: "Milestone 4", status: "Error" },
];

const getMilestones = (
	service: string | undefined,
	status: IStatus = {}
): IMilestone[] => {
	if (!service || !status[service]?.length) {
		return initialMilestones;
	}

	return (
		status[service]?.map((x: ITaskGroup, idx: number) => {
			const taskStatuses = x.tasks.map((xs: ITask) => xs.statusString);

			// "in-progress" "completed" "pending" "failed" "skipped"
			let status = "Not Started";
			const isPending = taskStatuses.every((x) => x === "pending");
			const isProgress =
				taskStatuses.includes("in-progress") &&
				!taskStatuses.includes("failed");
			const isProgressWithErrors =
				taskStatuses.includes("in-progress") && taskStatuses.includes("failed");
			const isErrorAll = taskStatuses.every((x) => x === "failed");
			const isSucceeded = taskStatuses.every((x) =>
				["completed", "skipped"].includes(x)
			);
			const isPartiallySucceeded = taskStatuses.every((x) =>
				["completed", "pending"].includes(x)
			);
			const isSkipped = taskStatuses.every((x) => x === "skipped");

			if (isPending) {
				status = "Not Started";
			} else if (isProgress) {
				status = "In Progress";
			} else if (isProgressWithErrors) {
				status = "In Progress (with Errors)";
			} else if (isErrorAll) {
				status = "Error";
			} else if (isSkipped) {
				status = "Skipped";
			} else if (isSucceeded) {
				status = "Completed";
			} else if (isPartiallySucceeded) {
				status = "Partially Completed";
			}

			return {
				id: idx,
				title: x.milestone,
				status,
				tasks: x.tasks,
			};
		}) || initialMilestones
	);
};

const DEFAULT_REFETCH_INTERVAL = 10000;

export const Dashboard: React.FC = (): JSX.Element => {
	const { service, status, setStatus, setService } = useGlobalStore();
	const [inputValue, setInputValue] = useState(service);

	// Fetch data using useQuery
	const { isPending, isError, data, error, isSuccess } = useQuery(
		aiStatusQueryOptions(service, DEFAULT_REFETCH_INTERVAL)
	);

	const milestones = useMemo(
		() => getMilestones(service, status),
		[service, status]
	);

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

	const handleSubmit = useCallback(
		(inputValue) => {
			setService(inputValue);
		},
		[setService]
	);

	const onClear = useCallback(() => {
		setService("");
	}, [setService]);

	return (
		<Card
			className="mb-6 flex-col rounded-2xl !p-0 m-auto h-full w-full"
			title={
				<Flex gap="small">
					<Text type="secondary">AI tool Progress of</Text>
					<Text strong>{service}</Text>
				</Flex>
			}
			extra={
				<Space.Compact style={{ width: "100%" }}>
					<Search
						placeholder="input search text"
						onSearch={handleSubmit}
						enterButton
						allowClear
						onClear={onClear}
					/>
				</Space.Compact>
			}
		>
			<Tabs
				defaultActiveKey="1"
				tabPosition="left"
				className="flex flex-grow h-full w-full"
				items={milestones.map((milestone, index) => {
					let progress = <></>;
					switch (milestone.status) {
						case "Not Started":
							progress = (
								<span className={`w-4 h-4 rounded-full bg-gray-300`}></span>
							);
							break;
						case "Skipped":
							progress = (
								<Iconify
									icon="ant-design:minus-circle-outlined"
									className={`w-4 h-4 rounded-full`}
								/>
							);
							break;
						case "In Progress":
							progress = (
								<Spin indicator={<LoadingOutlined spin />} size="small" />
							);
							break;
						case "In Progress (with Errors)":
							progress = (
								<Spin
									indicator={<LoadingOutlined spin />}
									size="small"
									colorPrimary="#faad14"
								/>
							);
							break;
						case "Error":
							progress = (
								<Progress
									type="circle"
									status="exception"
									size={24}
									strokeColor="#ff5630"
									trailColor="#ff5630"
								/>
							);
							break;
						case "Completed":
							progress = <Progress type="circle" percent={100} size={24} />;
							break;
						case "Partially Completed":
							progress = (
								<Progress
									type="circle"
									percent={80}
									size={24}
									success={{ percent: 80 }}
								/>
							);
							break;
					}
					return {
						label: (
							<Flex className="flex gap-4" align="center" key={index}>
								{progress}
								<Flex vertical align="flex-start">
									<Text strong>{milestone.title}</Text>
									<Text type="secondary" italic>
										{milestone.status}
									</Text>
								</Flex>
							</Flex>
						),
						key: "" + index,
						children:
							service && status[service]?.keys() ? (
								<LogsContainer
									tasks={milestone.tasks}
									milestone={milestone.title}
								/>
							) : (
								<Skeleton active />
							),
					};
				})}
			/>
		</Card>
	);
};

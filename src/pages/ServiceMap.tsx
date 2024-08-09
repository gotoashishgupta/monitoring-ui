import {
	GRAPHIN_LAYOUT_PRESETS,
	GRAPHIN_LAYOUT_SELECT_OPTIONS,
	SERVICE_MAP_ENVIRONMENT_SELECT_OPTIONS,
} from "#wf-local/common/constants";
import { checkIfIdExists } from "#wf-local/common/fn";
import { serviceMapQueryOptions } from "#wf-local/common/queryOptions";
import { SelectNode } from "#wf-local/components/behavior/SelectNode";
import { CircleLoading } from "#wf-local/components/loading";
import useServiceMapXFrm from "#wf-local/hooks/useServiceMapXFrm";
import { useServiceMapActions } from "#wf-local/store/serviceMapStore";
import Graphin, { Behaviors } from "@antv/graphin";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, Input, Select, type GetProps } from "antd";
import React, {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const { FitView, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;
const LAYOUT_PRESET = {
	type: "gForce",
	preset: {
		type: "concentric",
	},
};
const DEFAULT_LAYOUT_OPTION = "gforce_concentric";
const DEFAULT_ENV_OPTION = "e2e";
const DEFAULT_SELECTED_NODE = ""; //'e2e-cfe-dorja';

export const ServiceMap: React.FC = () => {
	const [refreshCount, setRefreshCount] = useState(1);
	const [env, setEnv] = useState(DEFAULT_ENV_OPTION);
	const { data } = useSuspenseQuery(serviceMapQueryOptions(env));
	const { setServiceMap } = useServiceMapActions();
	const serviceMapXFrmFn = useServiceMapXFrm();

	const serviceMapData = useMemo(() => {
		console.log(`Refecting service map data`);
		setServiceMap(data);
		return serviceMapXFrmFn(data);
	}, [data]);

	const [layout, setLayout] = useState(LAYOUT_PRESET);
	const [defaultLayoutOption, setDefaultLayoutOption] = useState(
		DEFAULT_LAYOUT_OPTION
	);
	const [selectedNode, setSelectedNode] = useState(DEFAULT_SELECTED_NODE);

	const onSearch = useCallback(
		(nodeId) => {
			const shouldFocus = checkIfIdExists(nodeId, serviceMapData);
			console.log("should focus", shouldFocus, nodeId);
			if (shouldFocus) {
				setSelectedNode(nodeId);
			}
		},
		[selectedNode, serviceMapData]
	);

	const onClear = useCallback(() => {
		setSelectedNode("");
	}, [selectedNode]);

	const onLayoutChange = useCallback((value) => {
		setDefaultLayoutOption(value);
		setLayout(GRAPHIN_LAYOUT_PRESETS[value]);
	}, []);

	const onEnvChange = useCallback((value) => {
		setEnv(value);
	}, []);

	useEffect(() => {
		// let c = 1;
		// if(refreshCount != 0) {
		//   c = 0;
		// }
		setRefreshCount(refreshCount + 1);
	}, [serviceMapData]);

	return (
		<Card
			title="Service Map"
			className="h-full"
			extra={
				<div className="min-w-62.5 w-full flex flex-grow">
					<Select
						className="min-w-[150px]"
						defaultValue={DEFAULT_ENV_OPTION}
						onChange={onEnvChange}
						options={SERVICE_MAP_ENVIRONMENT_SELECT_OPTIONS}
					/>
					<span className="ms-4"></span>
					<Search
						placeholder="input search text"
						onSearch={onSearch}
						enterButton
						allowClear
						onClear={onClear}
						className="min-w-48"
					/>
					<span className="ms-4"></span>
					<Select
						className="min-w-[200px]"
						defaultValue={defaultLayoutOption}
						onChange={onLayoutChange}
						options={GRAPHIN_LAYOUT_SELECT_OPTIONS}
					/>
				</div>
			}
		>
			<div style={{ minHeight: `calc(100vh - 240px)` }}>
				<Suspense fallback={<CircleLoading />}>
					<Graphin
						data={serviceMapData}
						layout={layout}
						style={{ minHeight: `calc(100vh - 240px)` }}
						key={refreshCount}
					>
						<ZoomCanvas enableOptimize maxZoom={8} minZoom={0.25} />
						<FitView isBindLayoutChange={true} />
						<DragNode />
						<ActivateRelations trigger="click" />
						<SelectNode nodeId={selectedNode} />
					</Graphin>
				</Suspense>
			</div>
		</Card>
	);
};

export default ServiceMap;

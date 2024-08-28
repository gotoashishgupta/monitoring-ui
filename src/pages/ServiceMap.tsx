import {
	GRAPHIN_LAYOUT_PRESETS,
	GRAPHIN_LAYOUT_SELECT_OPTIONS,
	SERVICE_MAP_ENVIRONMENT_SELECT_OPTIONS,
} from "#wf-local/common/constants";
import { checkIfIdExists } from "#wf-local/common/fn";
import { serviceMapQueryOptions } from "#wf-local/common/queryOptions";
import { SelectNode } from "#wf-local/components/behavior/SelectNode";
import { Iconify } from "#wf-local/components/icon";
import { CircleLoading } from "#wf-local/components/loading";
import useServiceMapXFrm from "#wf-local/hooks/useServiceMapXFrm";
import {
	useServiceMap,
	useServiceMapActions,
} from "#wf-local/store/serviceMapStore";
import Graphin, { Behaviors } from "@antv/graphin";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	AutoComplete,
	Card,
	Flex,
	Input,
	Select,
	Typography,
	type AutoCompleteProps,
	type GetProps,
} from "antd";
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

const DEFAULT_SELECTED_NODE = ""; //'e2e-cfe-dorja';

export const ServiceMap: React.FC = () => {
	const [refreshCount, setRefreshCount] = useState(1);
	const { env, layout } = useServiceMap();
	const { data } = useSuspenseQuery(serviceMapQueryOptions(env));
	const [searchOptions, setSearchOptions] = useState<
		AutoCompleteProps["options"]
	>([]);
	const { setServiceMap, setLayout, setEnv } = useServiceMapActions();
	const serviceMapXFrmFn = useServiceMapXFrm();

	const serviceMapData = useMemo(() => {
		console.log(`Refecting service map data`);
		setServiceMap(data);

		setSearchOptions([
			{
				label: (
					<Flex align="center" justify="space-between">
						Total {data.nodes.length} Services
					</Flex>
				),
				options: data.nodes
					.map((x) => {
						return {
							value: x.service,
							order_strength: data.edges.filter(
								(y) => x.service === y.source || x.service === y.target
							).length,
							label: (
								<div>
									<div>{x.service}</div>
									<Flex justify="space-between" align="center">
										<Typography.Text type="secondary">
											<Iconify icon="carbon:connect-source"></Iconify>{" "}
											{data.edges.filter((y) => x.service === y.source)
												.length ?? 0}
										</Typography.Text>
										<Typography.Text type="secondary">
											{data.edges.filter((y) => x.service === y.target)
												.length ?? 0}
											<Iconify icon="carbon:connect-target"></Iconify>
										</Typography.Text>
									</Flex>
								</div>
							),
						};
					})
					.sort((a, b) => b.order_strength - a.order_strength),
			},
		]);
		return serviceMapXFrmFn(data);
	}, [data]);

	const [selectedNode, setSelectedNode] = useState(DEFAULT_SELECTED_NODE);

	const onSearch = useCallback(
		(nodeId) => {
			const shouldFocus = checkIfIdExists(nodeId, serviceMapData);
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
		console.log(`layout `, value, GRAPHIN_LAYOUT_PRESETS[value]);
		setLayout(value);
	}, []);

	const onEnvChange = useCallback((value) => {
		console.log(`Env `, value);
		setEnv(value);
	}, []);

	useEffect(() => {
		// let c = 1;
		// if(refreshCount != 0) {
		//   c = 0;
		// }
		setRefreshCount(refreshCount + 1);
	}, [serviceMapData, layout]);

	return (
		<Card
			title="Service Map"
			className="h-full"
			extra={
				<div className="min-w-62.5 w-full flex flex-grow">
					<Select
						className="min-w-[150px]"
						defaultValue={env}
						onChange={onEnvChange}
						options={SERVICE_MAP_ENVIRONMENT_SELECT_OPTIONS}
					/>
					<span className="ms-4"></span>
					<AutoComplete
						options={searchOptions}
						onSelect={onSearch}
						filterOption={(inputValue, option) =>
							("" + option!.value)
								.toUpperCase()
								.indexOf(inputValue.toUpperCase()) !== -1
						}
					>
						<Search
							placeholder="input search text"
							onSearch={onSearch}
							enterButton
							allowClear
							onClear={onClear}
							className="min-w-64"
						/>
					</AutoComplete>
					<span className="ms-4"></span>
					<Select
						className="min-w-[200px]"
						defaultValue={layout}
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
						layout={GRAPHIN_LAYOUT_PRESETS[layout]}
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

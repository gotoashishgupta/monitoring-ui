import { serviceMapQueryOptions } from "#wf-local/common/queryOptions";
import useServiceMapXFrm from "#wf-local/hooks/useServiceMapXFrm";
import {
	useServiceMap,
	useServiceMapActions,
} from "#wf-local/store/serviceMapStore";
import { useSuspenseQuery } from "@tanstack/react-query";

import React, { useCallback, useMemo } from "react";
import { Graph } from "react-d3-graph";

import { SERVICE_GRAPH_CONFIG } from "#wf-local/common/constants";
import { App } from "antd";

export const ServiceMap: React.FC = () => {
	const { data } = useSuspenseQuery(serviceMapQueryOptions);
	const { setServiceMap } = useServiceMapActions();
	let serviceMap = useServiceMap();
	const serviceMapXFrmFn = useServiceMapXFrm();
	const serviceMapData = useMemo(() => {
		setServiceMap(data);
		return serviceMapXFrmFn(data);
	}, [data]);

	const { message } = App.useApp();

	const onNodePositionChange = useCallback(() => {
		message.success("Trying to change node position");
	}, []);

	const onZoomChange = useCallback(() => {
		message.success("Trying to zoom service map");
	}, []);

	return (
		<>
			<div>Service Network</div>
			<Graph
				id="service-map"
				config={SERVICE_GRAPH_CONFIG}
				data={serviceMapData}
				onNodePositionChange={onNodePositionChange}
				onZoomChange={onZoomChange}
			/>
		</>
	);
};

export default ServiceMap;

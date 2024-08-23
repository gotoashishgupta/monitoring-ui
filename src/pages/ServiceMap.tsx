import { serviceMapQueryOptions } from "#wf-local/common/queryOptions";
import useServiceMapXFrm from "#wf-local/hooks/useServiceMapXFrm";
import {
	useServiceMap,
	useServiceMapActions,
} from "#wf-local/store/serviceMapStore";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import Graphin, { Behaviors, Utils, GraphinContext } from "@antv/graphin";
import { App, Select, Row, Col, Card, Layout, Input, type GetProps } from "antd";
import { SelectNode } from "#wf-local/components/behavior/selectNode";
import { GRAPHIN_LAYOUT_SELECT_OPTIONS, GRAPHIN_LAYOUT_PRESETS } from "#wf-local/common/constants";
import { checkIfIdExists } from "#wf-local/common/fn";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const {FitView, ZoomCanvas, DragNode, ActivateRelations} = Behaviors;
const LAYOUT_PRESET = {
  type: 'gForce',
  preset: {
    type: 'concentric',
  },
};
const DEFAULT_LAYOUT_OPTION = 'gforce_concentric';
const DEFAULT_SELECTED_NODE = '' ; //'e2e-cfe-dorja';


export const ServiceMap: React.FC = () => {
	const { data } = useSuspenseQuery(serviceMapQueryOptions);
	const { setServiceMap } = useServiceMapActions();
	const serviceMapXFrmFn = useServiceMapXFrm();
	const { message } = App.useApp();
	let serviceMap = useServiceMap();

	const serviceMapData = useMemo(() => {
		setServiceMap(data);
		return serviceMapXFrmFn(data);
	}, [data]);

  const [layout, setLayout] = useState(LAYOUT_PRESET);
  const [defaultLayoutOption, setDefaultLayoutOption] = useState(DEFAULT_LAYOUT_OPTION)
  const [selectedNode, setSelectedNode] = useState(DEFAULT_SELECTED_NODE);

  const onSearch = useCallback((nodeId) => {
    const shouldFocus = checkIfIdExists(nodeId, serviceMapData);
    console.log('should focus', shouldFocus, nodeId);
    if(shouldFocus) {
      setSelectedNode(nodeId);
    }
  }, [selectedNode, serviceMapData]);

  const onClear = useCallback(() => {
    setSelectedNode('');
  }, [selectedNode]);

  const onLayoutChange = useCallback((value) => {
    setDefaultLayoutOption(value);
    setLayout(GRAPHIN_LAYOUT_PRESETS[value]);
  }, []);

	return (
		<Card
			title="Service Map"
			extra={
        <Layout>
          <Row className="flex" gutter={8}>
            <Col>
              <Search placeholder="input search text" onSearch={onSearch} enterButton allowClear onClear={onClear}/>
            </Col>
            <Col span={6}>
              <Select
                defaultValue={defaultLayoutOption}
                onChange={onLayoutChange}
                options={GRAPHIN_LAYOUT_SELECT_OPTIONS}
              />
            </Col>
          </Row>
        </Layout>
      }
		>
			<Graphin data={serviceMapData} layout={layout} >
        <ZoomCanvas enableOptimize />
        <FitView isBindLayoutChange={true}/>
        <DragNode />
        <ActivateRelations trigger="click" />
        <SelectNode nodeId={selectedNode}/>
      </Graphin>
		</Card>
	);
};



export default ServiceMap;

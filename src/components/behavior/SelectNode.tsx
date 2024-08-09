import React, { useContext, useEffect } from 'react';
import Graphin, { IG6GraphEvent, Utils, GraphinData, GraphinContext } from '@antv/graphin';
import { INode, NodeConfig } from '@antv/g6';

const data: GraphinData = Utils.mock(8).circle().graphin();

interface Props {
  nodeId?: string;
}

export const  SelectNode: React.FC<Props>= ({ nodeId }: Props) => {

  const { graph, apis } = useContext(GraphinContext);

  useEffect(() => {

    apis.focusNodeById(nodeId);

    const handleClick = (evt: IG6GraphEvent) => {
      const node = evt.item as INode;
      const model = node.getModel() as NodeConfig;
      apis.focusNodeById(model.id);
    };

    graph.on('node:click', handleClick);

    return () => {
      graph.off('node:click', handleClick);
    };

  }, []);
  return null;
};

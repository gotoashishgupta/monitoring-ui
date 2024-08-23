import React, { useCallback, useContext, useEffect, useState } from 'react';
import Graphin, { IG6GraphEvent, Utils, GraphinData, GraphinContext } from '@antv/graphin';
import * as R from 'ramda';
interface Props {
  nodeId?: string;
}

export const  SelectNode: React.FC<Props>= ({ nodeId }: Props) => {

  const { graph } = useContext(GraphinContext);
  const nodes = graph.getNodes();
  const edges = graph.getEdges();

  const [neighborData, setNeighborData] = useState({edges: [], nodes: []});

  const resetNetworkMap = useCallback(() => {
    nodes.forEach(node => {
      graph.setItemState(node, 'active', false);
      graph.setItemState(node, 'inactive', false);
      graph.setItemState(node, 'selected', false);
    });
    edges.forEach(edge => {
      graph.setItemState(edge, 'active', false); // active false means item is visible but not active, inactive true means items is dim
      graph.setItemState(edge, 'inactive', false);
      graph.setItemState(edge, 'selected', false);
    });
  }, []);

  const handleActivateRelations = useEffect(() => {
    resetNetworkMap();
    nodes.forEach(node => {
      const model = node.getModel();
      if(model.id === nodeId) {
        graph.focusItem(node, true);
        graph.setItemState(node, 'selected', true);
      }
      if (neighborData.nodes.includes(model.id) || nodeId === model.id) {
        graph.setItemState(node, 'active', true);
      } else {
        graph.setItemState(node, 'inactive', true);
      }
    });
    edges.forEach(edge => {
      const model = edge.getModel();
      if (R.includes([model.source, model.target], neighborData.edges)) {
        graph.setItemState(edge, 'active', true);
      } else {
        graph.setItemState(edge, 'inactive', true);
      }
    });
  }, [neighborData, nodeId]);

  useEffect(() => {
    if(!nodeId) {
      resetNetworkMap();
      return () => {};
    }
    const selectedNode = graph.findById(nodeId);
    if (selectedNode) {
      const directNodes = selectedNode.getNeighbors();
      const directNodeIds = directNodes.map(x => x.getModel().id);

      const directEdges = selectedNode.getEdges();
      const directEdgesIds = directEdges.map(x => [x.getModel().source, x.getModel().target]);
      setNeighborData({edges: directEdgesIds, nodes: directNodeIds});
      const {x, y} = selectedNode.getModel();
      graph.autoPaint();

      console.log(`x, y, ${x}, ${y}`, graph);
    }
    return () => {};
  }, [nodeId]);

  return null;

}

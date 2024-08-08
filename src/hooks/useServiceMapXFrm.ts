import { useCallback } from "react";

import * as R from "ramda";

// Function to transform nodes
const transformNodes = R.map(
	R.applySpec({
		id: R.prop("service"),
		height: R.always(1),
		size: R.always(24),
		color: R.always("rgb(97, 205, 187)"),
	})
);

// Function to transform edges
const transformEdges = R.map(
	R.applySpec({
		source: R.prop("source"),
		target: R.prop("target"),
		distance: R.always(80),
	})
);

// Main transformation function
const transformData = R.applySpec({
	nodes: R.pipe(R.prop("nodes"), transformNodes),
	links: R.pipe(R.prop("edges"), transformEdges),
});

export const useServiceMapXFrm = () => {
	const serviceMapXFrmFn = useCallback((x) => {
		return transformData(x);
	}, []);
	return serviceMapXFrmFn;
};

export default useServiceMapXFrm;

import { useThemeToken } from "#wf-local/theme/hooks";
import { useCallback } from "react";

import * as R from "ramda";

// Function to transform nodes
const transformNodes = R.map(
	R.applySpec({
		id: R.prop("service"),
		style: {
			label: {
				value: R.prop("service"),
				textAlign: "center",
				offset: 8,
			},
		},
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
	edges: R.pipe(R.prop("edges"), transformEdges),
});

export const useServiceMapXFrm = () => {
	const {
		colorPrimary,
		colorBgBase,
		colorTextSecondary,
		colorTextTertiary,
		colorBgContainer,
	} = useThemeToken();
	const serviceMapXFrmFn = useCallback((x) => {
		return transformData(x);
	}, []);
	return serviceMapXFrmFn;
};

export default useServiceMapXFrm;

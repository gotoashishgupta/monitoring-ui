import * as R from "ramda";

export const checkIfIdExists = (id, data) =>
	data.nodes.some((node) => node.id === id);

export const includes = R.includes;

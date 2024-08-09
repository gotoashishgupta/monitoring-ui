export const GRAPHIN_LAYOUT_SELECT_OPTIONS = [
	{
		label: "graphin-force",
		value: "graphin_force",
	},
	{
		label: "grid",
		value: "grid",
	},
	{
		label: "circular",
		value: "circular",
	},
	{
		label: "radial",
		value: "radial",
	},
	{
		label: "force",
		value: "force",
	},
	{
		label: "gForce",
		value: "gforce",
	},
	{
		label: "gForce - concentric",
		value: "gforce_concentric",
	},
	{
		label: "concentric",
		value: "concentric",
	},
	{
		label: "dagre",
		value: "dagre",
	},
	{
		label: "fruchterman",
		value: "fruchterman",
	},
	{
		label: "mds",
		value: "mds",
	},
	{
		label: "comboForce",
		value: "comboForce",
	},
];

export const GRAPHIN_LAYOUT_PRESETS = {
	graphin_force: {
		type: "graphin-force",
	},
	grid: {
		type: "grid",
	},
	circular: {
		type: "circular",
	},
	radial: {
		type: "radial",
	},
	force: {
		type: "force",
		preventOverlap: true,
		linkDistance: 50,
		nodeStrength: 30,
		edgeStrength: 0.8,
		collideStrength: 0.8,
		nodeSize: 30,
		alpha: 0.9,
		alphaDecay: 0.3,
		alphaMin: 0.01,
		forceSimulation: null,
		onTick: () => {
			console.log("ticking");
		},
		onLayoutEnd: () => {
			console.log("force layout done");
		},
	},
	gforce: {
		type: "gForce",
		linkDistance: 150,
		nodeStrength: 30,
		edgeStrength: 0.1,
		nodeSize: 30,
		workerEnabled: false,
		gpuEnabled: false,
	},
	gforce_concentric: {
		type: "gForce",
		preset: {
			type: "concentric",
		},
	},
	concentric: {
		type: "concentric",
		maxLevelDiff: 0.5,
		sortBy: "degree",
	},
	dagre: {
		type: "dagre",
		rankdir: "LR",
	},
	fruchterman: {
		type: "fruchterman",
	},
	mds: {
		type: "mds",
		workerEnabled: false,
	},
	comboForce: {
		type: "comboForce",
	},
};

export const SERVICE_MAP_ENVIRONMENT_SELECT_OPTIONS = [
	{
		label: "Production",
		value: "prod",
	},
	{
		label: "Development",
		value: "dev",
	},
	{
		label: "E2E",
		value: "e2e",
	},
];

export const DEFAULT_ENV_OPTION = "e2e";

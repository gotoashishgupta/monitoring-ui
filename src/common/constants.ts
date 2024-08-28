export const GRAPHIN_LAYOUT_SELECT_OPTIONS = [
	{
		label: "Force2",
		value: "force2",
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
		label: "comboCombined",
		value: "comboCombined",
	},
	{
		label: "dagre",
		value: "dagre",
	},
	{
		label: "comboForce",
		value: "comboForce",
	},
	{
		label: "forceAtlas2",
		value: "forceAtlas2",
	},
	{
		label: "graphin-force",
		value: "graphin_force",
	},
	{
		label: "fruchterman",
		value: "fruchterman",
	},
	{
		label: "concentric",
		value: "concentric",
	},
	{
		label: "circular",
		value: "circular",
	},
	{
		label: "force",
		value: "force",
	},
	{
		label: "grid",
		value: "grid",
	},
	{
		label: "radial",
		value: "radial",
	},
	{
		label: "mds",
		value: "mds",
	},
];

export const GRAPHIN_LAYOUT_PRESETS = {
	force2: {
		type: "force2",
		workerEnabled: true,
		preventOverlap: true,
		nodeSpacing: 100,
	},
	gforce: {
		type: "gForce",
		nodeStrength: 1000,
		edgeStrength: 200,
		nodeSize: 10,
		workerEnabled: true,
		gpuEnabled: false,
		preventOverlap: true,
		preset: {
			type: "fruchterman",
		},
	},
	gforce_concentric: {
		type: "gForce",
		preset: {
			type: "concentric",
			maxLevelDiff: 10,
			sortBy: "degree",
			linkDistance: 50, // The edge length
			preventOverlap: true, // nodeSize or size in data is required for preventOverlap: true
			nodeSize: 30,
			sweep: 10,
			equidistant: false,
			startAngle: 0,
			clockwise: false,
			workerEnabled: true, // Whether to activate web-worker
		},
		workerEnabled: true, // Whether to activate web-worker
	},
	comboCombined: {
		type: "comboCombined",
		workerEnabled: true, // Whether to activate web-worker
	},
	dagre: {
		type: "dagre",
		rankdir: "LR", // The center of the graph by default
		align: "DL",
		nodesep: 20,
		ranksep: 50,
		controlPoints: true,
		workerEnabled: true,
		sortByCombo: true,
	},
	comboForce: {
		type: "comboForce",
		linkDistance: 50, // Edge length
		nodeStrength: 30,
		edgeStrength: 0.1,
		preventOverlap: true,
		preventNodeOverlap: true,
		preventComboOverlap: true,
		nodeCollideStrength: 1,
		comboCollideStrength: 1,
		nodeSpacing: 100,
		comboSpacing: 300,
		workerEnabled: true, // Whether to activate web-worker
	},
	forceAtlas2: {
		type: "forceAtlas2",
		preventOverlap: true,
		preset: {
			type: "concentric",
		},
		workerEnabled: true, // Whether to activate web-worker
	},
	graphin_force: {
		type: "graphin-force",
		workerEnabled: true, // Whether to activate web-worker
	},
	fruchterman: {
		type: "fruchterman",
		workerEnabled: true, // Whether to activate web-worker
	},
	concentric: {
		type: "concentric",
		maxLevelDiff: 10,
		sortBy: "degree",
		preventOverlap: true, // nodeSize or size in data is required for preventOverlap: true
		nodeSize: 10,
		sweep: 10,
		equidistant: false,
		startAngle: 0,
		clockwise: false,
		nodeSpacing: 100,
		workerEnabled: true, // Whether to activate web-worker
	},
	grid: {
		type: "grid",
		workerEnabled: true, // Whether to activate web-worker
	},
	circular: {
		type: "circular",
		workerEnabled: true, // Whether to activate web-worker
	},
	radial: {
		type: "radial",
		workerEnabled: true, // Whether to activate web-worker
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
		workerEnabled: true, // Whether to activate web-worker
		onTick: () => {
			console.log("ticking");
		},
		onLayoutEnd: () => {
			console.log("force layout done");
		},
	},
	mds: {
		type: "mds",
		workerEnabled: true,
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

export const DEFAULT_SERVICE_MAP_ENV_OPTION = "e2e";
export const DEFAULT_SERVICE_MAP_LAYOUT_OPTION = "gforce_concentric";

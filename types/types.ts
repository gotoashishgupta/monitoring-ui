export type ServiceMapResponseEdges = {
  source: string;
  target: string;
}
export type ServiceMapResponseNodes = {
  service: string;
}

export type ServiceMapResonse = {
  edges: ServiceMapResponseEdges[];
  nodes: ServiceMapResponseNodes []
}

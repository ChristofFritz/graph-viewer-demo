

export class Graph {
  nodes?: Node[];
  edges?: Edge[];

  constructor(v: Partial<Graph> = {}) {
    this.nodes = v.nodes?.map(n => new Node(n));
    this.edges = v.edges?.map(n => new Edge(n));
  }

  node(id: number): Node | undefined {
    return this.nodes?.find(n => n.id === id);
  }
}

export class Node {
  id?: number;

  x?: number;
  y?: number;

  snapTopX?: number;
  snapTopY?: number;

  snapBottomX?: number;
  snapBottomY?: number;

  constructor(v: Partial<Node> = {}) {
    this.id = v.id;
    this.x = v.x;
    this.y = v.y;
    this.snapTopX = v.snapTopX;
    this.snapTopY = v.snapTopY;
    this.snapBottomX = v.snapBottomX;
    this.snapBottomY = v.snapBottomY;
  }
}

export class Edge {
  source_id?: number;
  destination_id?: number;

  constructor(v: Partial<Edge>) {
    this.source_id = v.source_id;
    this.destination_id = v.destination_id;
  }
}


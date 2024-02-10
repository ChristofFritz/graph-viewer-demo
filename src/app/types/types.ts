import {rankSortedNodes, topologicalSort} from './functions';

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

  edgeSource(id: number): Edge | undefined {
    return this.edges?.find(n => n.source_id === id);
  }

  edgeDestination(id: number): Edge | undefined {
    return this.edges?.find(n => n.destination_id === id);
  }

  childNodes(id: number): Node[] {
    if (!this.edges) {
      return [];
    }

    return (
      this.edges
        .filter(e => e.source_id === id)
        ?.map(e => this.node(e.destination_id!)) ?? []
    )
      .filter(v => !!v) as Node[];
  }

  nodesByRank() {
    const ranks: Node[][] = [];

    this.nodes?.forEach(n => {
      if (ranks.length < (n.rank! + 1)) {
        ranks.push([]);
      }

      ranks[n.rank!].push(n);
    });

    return ranks;
  }

  rankNodes() {
    this.nodes = topologicalSort(this);
    rankSortedNodes(this, this.nodes);
  }
}

export class Node {
  id?: number;

  rank?: number;

  x?: number;
  y?: number;

  snapTopX?: number;
  snapTopY?: number;

  snapBottomX?: number;
  snapBottomY?: number;

  constructor(v: Partial<Node> = {}) {
    this.id = v.id;
    this.rank = v.rank;
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


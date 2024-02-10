import {Graph, Node} from './types';

export function depthFirstSearch(graph: Graph, node: Node, visited: Map<number, boolean>, stack: Node[]) {
  if (!graph || !node || !visited || !stack) {
    return;
  }

  visited.set(node.id!, true);

  for(let neighbor of graph.childNodes(node.id!)) {
    if(!visited.get(neighbor.id!)) {
      depthFirstSearch(graph, neighbor, visited, stack);
    }
  }

  stack.push(node);
}

export function topologicalSort(graph: Graph) {
  const stack: Node[] = [];
  const visited = new Map<number, boolean>();

  for(let i = 0; i < graph!.nodes!.length!; i++) {
    if(!visited.get(graph!.nodes![i].id!)) {
      depthFirstSearch(graph, graph!.nodes![i], visited, stack);
    }
  }

  return stack.reverse();
}

export function rankSortedNodes(graph: Graph, sortedNodes: Node[]) {
  sortedNodes[0].rank = 0;

  sortedNodes.forEach(sortedNode => {
    graph.childNodes(sortedNode.id!).forEach(childNode => {
      if (!childNode.rank) {
        childNode.rank = (sortedNode.rank ?? 0) + 1;
      }
    })
  })
}

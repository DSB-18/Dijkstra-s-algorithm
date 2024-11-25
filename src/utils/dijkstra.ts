export type Graph = { [vertex: string]: { [neighbor: string]: number } };
export type Distances = { [vertex: string]: number };

export const dijkstra = (graph: Graph, start: string): Distances => {
  const distances: Distances = {};
  const priorityQueue: [number, string][] = [];
  const visited: Set<string> = new Set();

  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;
  priorityQueue.push([0, start]);

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a[0] - b[0]);
    const [currentDistance, currentVertex] = priorityQueue.shift()!;

    if (visited.has(currentVertex)) continue;
    visited.add(currentVertex);

    for (const [neighbor, weight] of Object.entries(graph[currentVertex])) {
      const newDistance = currentDistance + weight;
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        priorityQueue.push([newDistance, neighbor]);
      }
    }
  }

  return distances;
};

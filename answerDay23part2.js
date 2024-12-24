console.time('Execution Time');
const fs = require('fs');
const input = fs.readFileSync('inputDay23.txt', 'utf8').trim().split('\n');

const graph = {};
input.forEach(connection => {
  const [a, b] = connection.split('-');
  if (!graph[a]) graph[a] = new Set();
  if (!graph[b]) graph[b] = new Set();
  graph[a].add(b);
  graph[b].add(a);
});

// Bron-Kerbosch algorithm
const bronKerbosch = (R, P, X, cliques) => {
  if (P.size === 0 && X.size === 0) {
    cliques.push(new Set(R));
    return;
  }
  const PArray = Array.from(P);
  for (const v of PArray) {
    const neighbors = graph[v] || new Set();
    bronKerbosch(
      new Set([...R, v]),
      new Set([...P].filter(x => neighbors.has(x))),
      new Set([...X].filter(x => neighbors.has(x))),
      cliques
    );
    P.delete(v);
    X.add(v);
  }
};

const findLargestClique = (graph) => {
  const nodes = Object.keys(graph);
  const cliques = [];
  bronKerbosch(new Set(), new Set(nodes), new Set(), cliques);
  let maxClique = [];
  cliques.forEach(clique => {
    if (clique.size > maxClique.length) {
      maxClique = Array.from(clique);
    }
  });
  return maxClique;
};

const largestClique = findLargestClique(graph);
const password = largestClique.sort().join(',');

console.log(password);
console.timeEnd('Execution Time');

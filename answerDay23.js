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

const findTriangles = (graph) => {
  const triangles = new Set();
  for (const a in graph) {
    for (const b of graph[a]) {
      if (b > a) {
        for (const c of graph[b]) {
          if (c > b && graph[a].has(c)) {
            triangles.add([a, b, c].sort().join(','));
          }
        }
      }
    }
  }
  return triangles;
};

const filterTriangles = (triangles) => {
  return [...triangles].filter(triangle => triangle.split(',').some(name => name.startsWith('t')));
};

const triangles = findTriangles(graph);
const filteredTriangles = filterTriangles(triangles);
const count = filteredTriangles.length;

console.log(count);
console.timeEnd('Execution Time');

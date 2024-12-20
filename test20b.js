console.time('Execution Time');

const fs = require('fs');
const input = fs.readFileSync('inputDay20.txt', 'utf8').trim().split('\n');

const grid = {};
input.forEach((line, i) => {
  line.split('').forEach((c, j) => {
    if (c !== '#') {
      grid[`${i},${j}`] = c;
    }
  });
});

let start;
for (const pos in grid) {
  if (grid[pos] === 'S') {
    start = pos;
    break;
  }
}

const dist = { [start]: 0 };
const todo = [start];

while (todo.length > 0) {
  const pos = todo.shift();
  const [x, y] = pos.split(',').map(Number);
  const neighbors = [
    `${x-1},${y}`,
    `${x+1},${y}`,
    `${x},${y-1}`,
    `${x},${y+1}`
  ];

  neighbors.forEach(newPos => {
    if (grid[newPos] && !(newPos in dist)) {
      dist[newPos] = dist[pos] + 1;
      todo.push(newPos);
    }
  });
}

let a = 0, b = 0;
const positions = Object.keys(dist);

for (let i = 0; i < positions.length; i++) {
  for (let j = i + 1; j < positions.length; j++) {
    const [p, q] = [positions[i], positions[j]];
    const [px, py] = p.split(',').map(Number);
    const [qx, qy] = q.split(',').map(Number);
    const d = Math.abs(px - qx) + Math.abs(py - qy);
    const diff = dist[q] - dist[p] - d;

    if (d === 2 && diff >= 100) a++;
    if (d < 21 && diff >= 100) b++;
  }
}

console.log(a, b);

console.timeEnd('Execution Time');

console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay10.txt', 'utf8').trim().split('\n');
function parseMap(map) {
  return map.map(line => line.split('').map(Number));
}

function findTrailheads(map) {
  const trailheads = [];
  for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
          if (map[i][j] === 0) {
              trailheads.push([i, j]);
          }
      }
  }
  return trailheads;
}

function isValidMove(map, x, y, currentHeight) {
  return x >= 0 && x < map.length && y >= 0 && y < map[0].length && map[x][y] === currentHeight + 1;
}

function bfs(map, start) {
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const queue = [start];
  const visited = new Set();
  visited.add(start.toString());
  let score = 0;

  while (queue.length > 0) {
      const [x, y] = queue.shift();
      if (map[x][y] === 9) {
          score++;
      }
      for (const [dx, dy] of directions) {
          const newX = x + dx;
          const newY = y + dy;
          if (isValidMove(map, newX, newY, map[x][y]) && !visited.has([newX, newY].toString())) {
              queue.push([newX, newY]);
              visited.add([newX, newY].toString());
          }
      }
  }
  return score;
}

function calculateTotalScore(map) {
  const parsedMap = parseMap(map);
  const trailheads = findTrailheads(parsedMap);
  let totalScore = 0;

  for (const trailhead of trailheads) {
      totalScore += bfs(parsedMap, trailhead);
  }
  return totalScore;
}

// Exemple d'utilisation
const map = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;

console.log(calculateTotalScore(data)); // Affiche 36


console.timeEnd('Execution Time');

console.time('Execution Time');

const fs = require('fs');
const filename = 'inputDay12.txt';

map= fs.readFileSync(filename, 'utf8').trim().split('\n').map(line => line.split(''));

function getNeighbors(x, y) {
  return [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
  ];
}

function bfs(map, x, y, visited) {
  const queue = [[x, y]];
  const plantType = map[x][y];
  const region = new Set();
  visited.add(`${x},${y}`);

  while (queue.length > 0) {
      const [cx, cy] = queue.shift();
      region.add(`${cx},${cy}`);

      const neighbors = getNeighbors(cx, cy);
      for (const [nx, ny] of neighbors) {
          if (map[nx] && map[nx][ny] === plantType && !visited.has(`${nx},${ny}`)) {
              visited.add(`${nx},${ny}`);
              queue.push([nx, ny]);
          }
      }
  }

  return region;
}

function score(region) {
  const area = region.size;
  let perimeter = 4 * area;
  const posTaxi = [[1, 0], [0, 1]];

  for (const plant of region) {
      const [px, py] = plant.split(',').map(Number);
      for (const [dx, dy] of posTaxi) {
          const neighbor1 = `${px + dx},${py + dy}`;
          const neighbor2 = `${px + dy},${py + dx}`;
          const neighbor3 = `${px - dy},${py - dx}`;
          const neighbor4 = `${px + dx + dy},${py + dy + dx}`;
          const neighbor5 = `${px + dx - dy},${py + dy - dx}`;

          if (region.has(neighbor1)) {
              perimeter -= 2;
              if (!region.has(neighbor2) && !region.has(neighbor4)) perimeter--;
              if (!region.has(neighbor3) && !region.has(neighbor5)) perimeter--;
          }
      }
  }
  return area * perimeter;
}

function calculateTotalPrice(map) {
  const visited = new Set();
  const regions = [];

  for (let x = 0; x < map.length; x++) {
      for (let y = 0; y < map[0].length; y++) {
          if (!visited.has(`${x},${y}`)) {
              const region = bfs(map, x, y, visited);
              const price = score(region);
              regions.push(price);
          }
      }
  }

  return regions.reduce((total, price) => total + price, 0);
}

console.log(calculateTotalPrice(map));

console.timeEnd('Execution Time');

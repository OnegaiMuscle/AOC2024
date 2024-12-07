console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay06.txt', 'utf8');
const input = data.trim().split('\n');

const directions = {
  '^': { dx: 0, dy: -1, right: '>' },
  'v': { dx: 0, dy: 1, right: '<' },
  '<': { dx: -1, dy: 0, right: '^' },
  '>': { dx: 1, dy: 0, right: 'v' }
};

function findGuardPosition(layout) {
  for (let y = 0; y < layout.length; y++) {
      for (let x = 0; x < layout[y].length; x++) {
          if (['^', 'v', '<', '>'].includes(layout[y][x])) {
              return { x, y, direction: layout[y][x] };
          };
      };
  };
  return null;
};

let loopObstructions = 0;

function simulateGuardMovement(layout, saveDirections = false) {
  const visited = new Set();
  let { x, y, direction } = findGuardPosition(layout);
  const coord = () => saveDirections ? `${x},${y},${direction}` : `${x},${y}`;
  visited.add(coord());
  while (true) {
    const { dx, dy, right } = directions[direction];
    const newX = x + dx;
    const newY = y + dy;
    if (newX < 0 || newY < 0 || newY >= layout.length || newX >= layout[0].length) {
      break;
    }
    if (layout[newY][newX] === '#') {
      direction = right;
    } else {
      x = newX;
      y = newY;
      if (saveDirections && visited.has(coord())) {
        loopObstructions++;
        break;
      }
      visited.add(coord());
    };
  };
  return visited;
};

function findLoopObstructionPositions(layout) {
  const visitedhome = simulateGuardMovement(layout);
  for (let i = 1; i < visitedhome.size; i++) {
    let [x, y] = [...visitedhome][i].split(',');
    const testMap = layout.map(row => [...row]);
    testMap[y][x] = '#';
    simulateGuardMovement(testMap, true);
  };
};

console.log('answer01:', simulateGuardMovement(input).size);
findLoopObstructionPositions(input);
console.log('answer02:', loopObstructions);

console.timeEnd('Execution Time');

console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay06.txt', 'utf8');
const lines = data.trim().split('\n');

const directions = {
  '^': { dx: 0, dy: -1, right: '>' },
  'v': { dx: 0, dy: 1, right: '<' },
  '<': { dx: -1, dy: 0, right: '^' },
  '>': { dx: 1, dy: 0, right: 'v' }
};

function findGuardPosition(map) {
  for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
          if (['^', 'v', '<', '>'].includes(map[y][x])) {
              return { x, y, direction: map[y][x] };
          }
      }
  }
  return null;
}

const simulateGuardMovement = map => {
  const visited = new Set();
  let { x, y, direction } = findGuardPosition(map);

  visited.add(`${x},${y}`);
  while (true) {
    const { dx, dy, right } = directions[direction];
    const newX = x + dx;
    const newY = y + dy;
    if (newX < 0 || newY < 0 || newY >= map.length || newX >= map[0].length) {
      break;
    }
    if (map[newY][newX] === '#') {
      direction = right;
    } else {
      x = newX;
      y = newY;
      visited.add(`${x},${y}`);
    }
  }
  return visited;
};

let loopObstructions = 0
const simulateGuardMovementbis = map => {
  const visitedbis = new Set();
  let { x, y, direction } = findGuardPosition(map);

  visitedbis.add(`${x},${y},${direction}`)
  while (true) {
    const { dx, dy, right } = directions[direction];
    const newX = x + dx;
    const newY = y + dy;
    if (newX < 0 || newY < 0 || newY >= map.length || newX >= map[0].length) {
      break;
    }
    if (map[newY][newX] === '#') {
      direction = right;
    } else {
      x = newX;
      y = newY;
       if (visitedbis.has(`${x},${y},${direction}`)) {
        loopObstructions++
        break;
      };
      visitedbis.add(`${x},${y},${direction}`);
    };
  };
};

const findLoopObstructionPositions = map => {
  const visitedhome = simulateGuardMovement(map);
  for (let i = 1; i < visitedhome.size; i++) {
    [x,y]=[...visitedhome][i].split(',').map(Number)
    const testMap = map.map(row => [...row]);
    testMap[y][x] = '#'
    simulateGuardMovementbis(testMap)
  }
};
findLoopObstructionPositions(lines)
console.log(loopObstructions)

console.timeEnd('Execution Time');

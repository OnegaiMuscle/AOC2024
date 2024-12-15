console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay15.txt', 'utf8');
const [warehouseSection, movesSection] = data.trim().split('\n\n');
const warehouseGrid = warehouseSection.trim().split('\n').map(line => line.split(''));
const robotMoves = movesSection.trim().split('\n').join('');

function resizeWarehouse(grid) {
  return grid.map(row => row.flatMap(cell => {
    switch (cell) {
      case '#': return ['#', '#'];
      case 'O': return ['[', ']'];
      case '.': return ['.', '.'];
      case '@': return ['@', '.'];
      default: return [cell, cell];
    }
  }));
}

const resizedWarehouseGrid = resizeWarehouse(warehouseGrid);
const numRows = resizedWarehouseGrid.length;
const numCols = resizedWarehouseGrid[0].length;

let robotPosition = { row: 0, col: 0 };
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (resizedWarehouseGrid[row][col] === '@') {
      robotPosition = { row, col };
    }
  }
}

const directions = {
  '^': { x: 0, y: -1 },
  'v': { x: 0, y: 1 },
  '<': { x: -1, y: 0 },
  '>': { x: 1, y: 0 }
};

function addCoordinates(position, direction) {
  return { x: position.x + direction.x, y: position.y + direction.y };
}

function getGridKey(position) {
  return `${position.x},${position.y}`;
}

function move(position, direction, grid) {
  position = addCoordinates(position, direction);

  if (grid[getGridKey(position)] !== "[" || (move(addCoordinates(position, { x: 1, y: 0 }), direction, grid) && move(position, direction, grid))) {
    if (grid[getGridKey(position)] !== "]" || (move(addCoordinates(position, { x: -1, y: 0 }), direction, grid) && move(position, direction, grid))) {
      if (grid[getGridKey(position)] !== "O" || move(position, direction, grid)) {
        if (grid[getGridKey(position)] !== "#") {
          let temp = grid[getGridKey(position)];
          grid[getGridKey(position)] = grid[getGridKey(addCoordinates(position, { x: -direction.x, y: -direction.y }))];
          grid[getGridKey(addCoordinates(position, { x: -direction.x, y: -direction.y }))] = temp;
          return true;
        }
      }
    }
  }
  return false;
}

const grid = {};
resizedWarehouseGrid.forEach((row, rowIndex) => {
  row.forEach((cell, colIndex) => {
    grid[getGridKey({ x: colIndex, y: rowIndex })] = cell;
  });
});

let robotPos = { x: robotPosition.col, y: robotPosition.row };

for (let moveDirection of robotMoves) {
  const direction = directions[moveDirection];
  const gridCopy = { ...grid };

  if (move(robotPos, direction, grid)) {
    robotPos = addCoordinates(robotPos, direction);
  } else {
    Object.assign(grid, gridCopy);
  }
}

let totalGps = Object.keys(grid).filter(key => grid[key] === "[").map(key => {
    const [x, y] = key.split(",").map(Number);
    return { x, y };
}).reduce((sum, { x, y }) => sum + x + y * 100, 0);

console.log(totalGps);

console.timeEnd('Execution Time');

console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay15.txt', 'utf8');
const [warehouseSection, movesSection] = data.trim().split('\n\n');
const warehouseGrid = warehouseSection.trim().split('\n').map(line => line.split(''));
const robotMoves = movesSection.trim().split('\n').join('');

console.log(warehouseGrid);
console.log(robotMoves);

const numRows = warehouseGrid.length;
const numCols = warehouseGrid[0].length;
let robotRow = null;
let robotCol = null;

for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (warehouseGrid[row][col] === '@') {
      robotRow = row;
      robotCol = col;
      break;
    }
  }
  if (robotRow !== null) {
    break;
  }
}

const directions = {
  '^': [-1, 0],
  'v': [1, 0],
  '<': [0, -1],
  '>': [0, 1]
};

function moveRobot(deltaRow, deltaCol) {
  const newRow = robotRow + deltaRow;
  const newCol = robotCol + deltaCol;
  const targetCell = warehouseGrid[newRow][newCol];

  if (targetCell === '#') {
    return;
  }

  if (targetCell === '.') {
    [warehouseGrid[robotRow][robotCol], warehouseGrid[newRow][newCol]] = ['.', '@'];
    robotRow = newRow;
    robotCol = newCol;
    return;
  }

  if (targetCell === 'O') {
    const boxChain = [];
    let boxRow = newRow;
    let boxCol = newCol;

    while (0 <= boxRow && boxRow < numRows && 0 <= boxCol && boxCol < numCols && warehouseGrid[boxRow][boxCol] === 'O') {
      boxChain.push([boxRow, boxCol]);
      boxRow += deltaRow;
      boxCol += deltaCol;
    }

    if (!(0 <= boxRow && boxRow < numRows && 0 <= boxCol && boxCol < numCols)) {
      return;
    }

    if (warehouseGrid[boxRow][boxCol] !== '.') {
      return;
    }

    warehouseGrid[robotRow][robotCol] = '.';
    warehouseGrid[newRow][newCol] = '@';
    robotRow = newRow;
    robotCol = newCol;

    for (const [boxR, boxC] of boxChain) {
      warehouseGrid[boxR][boxC] = '.';
    }

    for (const [boxR, boxC] of boxChain) {
      warehouseGrid[boxR + deltaRow][boxC + deltaCol] = 'O';
    }
  }
}

for (const move of robotMoves) {
  const [deltaRow, deltaCol] = directions[move];
  moveRobot(deltaRow, deltaCol);
}

let totalGPS = 0;
for (let row = 0; row < numRows; row++) {
  for (let col = 0; col < numCols; col++) {
    if (warehouseGrid[row][col] === 'O') {
      totalGPS += 100 * row + col;
    }
  }
}
console.log(totalGPS);

console.timeEnd('Execution Time');

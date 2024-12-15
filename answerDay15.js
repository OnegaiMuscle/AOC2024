console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay15.txt', 'utf8');
const [warehouseSection, movesSection] = data.trim().split('\n\n');
const warehouseGrid = warehouseSection.trim().split('\n').map(line => line.split(''));
const robotMoves = movesSection.trim().split('\n').join('');

const numRows = warehouseGrid.length;
const numCols = warehouseGrid[0].length;

let [robotRow, robotCol] = warehouseGrid.reduce((pos, row, r) => {
  const c = row.indexOf('@');
  return c !== -1 ? [r, c] : pos;
}, [null, null]);

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

  if (targetCell === '#') return;

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

    if (!(0 <= boxRow && boxRow < numRows && 0 <= boxCol && boxCol < numCols) || warehouseGrid[boxRow][boxCol] !== '.') return;

    warehouseGrid[robotRow][robotCol] = '.';
    warehouseGrid[newRow][newCol] = '@';
    robotRow = newRow;
    robotCol = newCol;

    boxChain.forEach(([boxR, boxC]) => warehouseGrid[boxR][boxC] = '.');
    boxChain.forEach(([boxR, boxC]) => warehouseGrid[boxR + deltaRow][boxC + deltaCol] = 'O');
  }
}

robotMoves.split('').forEach(move => {
  const [deltaRow, deltaCol] = directions[move];
  moveRobot(deltaRow, deltaCol);
});

const totalGPS = warehouseGrid.reduce((total, row, r) => {
  return total + row.reduce((rowTotal, cell, c) => {
    return cell === 'O' ? rowTotal + 100 * r + c : rowTotal;
  }, 0);
}, 0);

console.log(totalGPS);
console.timeEnd('Execution Time');

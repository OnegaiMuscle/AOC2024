console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay15.txt', 'utf8');
const [wareHouseSection, movesSection] = data.trim().split('\n\n');
const warehouse = wareHouseSection.trim().split('\n').map(line => line.split(''))
const moves = movesSection.trim().split('\n').join('')
console.log(warehouse)
console.log(moves)
const rows = warehouse.length;
const cols = warehouse[0].length;
let robotR = null;
let robotC = null;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (warehouse[r][c] === '@') {
      robotR = r;
      robotC = c;
      break;
    }
  }
  if (robotR !== null) {
    break;
  }
}

const dir = {
  '^': [-1, 0],
  'v': [1, 0],
  '<': [0, -1],
  '>': [0, 1]
};

function move(dr, dc) {
  const nr = robotR + dr;
  const nc = robotC + dc;
  const cell = warehouse[nr][nc];
  if (cell === '#') {
    return;
  }
  if (cell === '.') {
    [warehouse[robotR][robotC], warehouse[nr][nc]] = ['.', '@'];
    robotR = nr;
    robotC = nc;
    return;
  }
  if (cell === 'O') {
    const chain = [];
    let rpos = nr;
    let cpos = nc;
    while (0 <= rpos && rpos < rows && 0 <= cpos && cpos < cols && warehouse[rpos][cpos] === 'O') {
      chain.push([rpos, cpos]);
      rpos += dr;
      cpos += dc;
    }
    if (!(0 <= rpos && rpos < rows && 0 <= cpos && cpos < cols)) {
      return;
    }
    if (warehouse[rpos][cpos] !== '.') {
      return;
    }
    warehouse[robotR][robotC] = '.';
    warehouse[nr][nc] = '@';
    robotR = nr;
    robotC = nc;
    for (const [cr, cc] of chain) {
      warehouse[cr][cc] = '.';
    }
    for (const [cr, cc] of chain) {
      warehouse[cr + dr][cc + dc] = 'O';
    }
  }
}

for (const m of moves) {
  const [dr, dc] = dir[m];
  move(dr, dc);
}

let total = 0;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (warehouse[r][c] === 'O') {
      total += 100 * r + c;
    }
  }
}
console.log(total);

console.timeEnd('Execution Time');

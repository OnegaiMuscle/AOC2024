const fs = require('fs');
const maze = fs.readFileSync('inputDay16.txt', 'utf8').split('\n');
const [rows, cols] = [maze.length, maze[0].length];

function findPosition(maze, pos) {
  for (let row = 0; row < maze.length; row++) {
      for (let col = 0; col < maze[0].length; col++) {
          if (maze[row][col] === pos) return [row, col];
      }
  }
}

function isValidMove(x, y, rows, cols, maze) {
  return x >= 0 && x < rows && y >= 0 && y < cols && maze[x][y] !== '#';
}

function minCostPath(maze) {
  const start = findPosition(maze, 'S');
  const end = findPosition(maze, 'E');
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const costs = new Map();
  const pq = [];


  for (let dir = 0; dir < 4; dir++) {
      costs.set(`${start[0]},${start[1]},${dir}`, 0);
      pq.push({ cost: 0, x: start[0], y: start[1], direction: dir });
  }

  while (pq.length > 0) {
      pq.sort((a, b) => a.cost - b.cost);
      const { cost: currentCost, x, y, direction } = pq.shift();

      if (x === end[0] && y === end[1]) {
          return currentCost;
      }

      const [dx, dy] = directions[direction];
      const nx = x + dx;
      const ny = y + dy;
      if (isValidMove(nx, ny, rows, cols, maze)) {
          const newCost = currentCost + 1;
          const key = `${nx},${ny},${direction}`;
          if (!costs.has(key) || newCost < costs.get(key)) {
              costs.set(key, newCost);
              pq.push({ cost: newCost, x: nx, y: ny, direction });
          }
      }

      const leftDirection = (direction + 3) % 4;
      const leftNx = x + directions[leftDirection][0];
      const leftNy = y + directions[leftDirection][1];
      if (isValidMove(leftNx, leftNy, rows, cols, maze)) {
          const newCost = currentCost + 1 + 1000;
          const key = `${leftNx},${leftNy},${leftDirection}`;
          if (!costs.has(key) || newCost < costs.get(key)) {
              costs.set(key, newCost);
              pq.push({ cost: newCost, x: leftNx, y: leftNy, direction: leftDirection });
          }
      }
      const rightDirection = (direction + 1) % 4;
      const rightNx = x + directions[rightDirection][0];
      const rightNy = y + directions[rightDirection][1];
      if (isValidMove(rightNx, rightNy, rows, cols, maze)) {
          const newCost = currentCost + 1 + 1000;
          const key = `${rightNx},${rightNy},${rightDirection}`;
          if (!costs.has(key) || newCost < costs.get(key)) {
              costs.set(key, newCost);
              pq.push({ cost: newCost, x: rightNx, y: rightNy, direction: rightDirection });
          }
      }
  }
  return Infinity;
}

console.log(minCostPath(maze));

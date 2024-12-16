const fs = require('fs');
const maze = fs.readFileSync('inputDay16.txt', 'utf8').split('\n');
const [rows, cols] = [maze.length, maze[0].length];

function findPosition(maze, char) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (maze[row][col] === char) return [row, col];
        }
    }
}

function isValidMove(x, y, rows, cols, maze) {
    return x >= 0 && x < rows && y >= 0 && y < cols && maze[x][y] !== '#';
}

function minCostPath(maze, collectPaths = false) {
    const start = findPosition(maze, 'S');
    const end = findPosition(maze, 'E');
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const costs = new Map();
    const pq = [];
    const bestPathTiles = new Set();

    for (let dir = 0; dir < 4; dir++) {
        costs.set(`${start[0]},${start[1]},${dir}`, 0);
        pq.push({ cost: 0, x: start[0], y: start[1], direction: dir, path: new Set([`${start[0]},${start[1]}`]) });
    }

    let minCost = Infinity;

    while (pq.length > 0) {
        pq.sort((a, b) => a.cost - b.cost);
        const { cost: currentCost, x, y, direction, path } = pq.shift();

        if (x === end[0] && y === end[1]) {
            if (currentCost < minCost) {
                minCost = currentCost;
            }
            if (currentCost === minCost && collectPaths) {
                path.forEach(pos => bestPathTiles.add(pos));
            }
            continue;
        }

        if (currentCost > minCost) continue;

        const [dx, dy] = directions[direction];
        const nx = x + dx;
        const ny = y + dy;
        if (isValidMove(nx, ny, rows, cols, maze)) {
            const newCost = currentCost + 1;
            const key = `${nx},${ny},${direction}`;
            if (!costs.has(key) || newCost <= costs.get(key)) {
                costs.set(key, newCost);
                const newPath = new Set(path);
                newPath.add(`${nx},${ny}`);
                pq.push({ cost: newCost, x: nx, y: ny, direction, path: newPath });
            }
        }

        const leftDirection = (direction + 3) % 4;
        const rightDirection = (direction + 1) % 4;

        for (const newDirection of [leftDirection, rightDirection]) {
            const turnCost = currentCost + 1000;
            const key = `${x},${y},${newDirection}`;
            if (!costs.has(key) || turnCost <= costs.get(key)) {
                costs.set(key, turnCost);
                pq.push({ cost: turnCost, x, y, direction: newDirection, path: new Set(path) });
            }
        }
    }

    if (collectPaths) {
        return bestPathTiles;
    }
    return minCost;
}

console.log(minCostPath(maze));
const bestPaths = minCostPath(maze, true);
console.log(bestPaths.size);

const newMaze = maze.map((row, i) =>
    row.split('').map((cell, j) => {
        if (cell === '#') return '#';
        return bestPaths.has(`${i},${j}`) ? 'O' : '.';
    }).join('')
);

fs.writeFileSync('outputMaze.txt', newMaze.join('\n'));

const fs = require('fs');
const data = fs.readFileSync('inputDay15.txt', 'utf8');
const [wareHouseSection, movesSection] = data.trim().split('\n\n');
const warehouse = wareHouseSection.trim().split('\n')
const lines = movesSection.trim().split('\n')
let moves = '';
 for (const line of lines) {
  moves += line;
}

const directions = {
    '^': [-1, 0],
    'v': [1, 0],
    '<': [0, -1],
    '>': [0, 1]
};

function parseWarehouse(warehouse) {
    const grid = warehouse.map(line => line.split(''));
    let robotPos = null;
    const boxes = new Set();

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '@') {
                robotPos = [y, x];
            } else if (grid[y][x] === 'O') {
                boxes.add(`${y},${x}`);
            }
        }
    }

    return { grid, robotPos, boxes };
}

function moveRobot(grid, robotPos, boxes, move) {
    const [dy, dx] = directions[move];
    const [ry, rx] = robotPos;
    const [ny, nx] = [ry + dy, rx + dx];

    if (grid[ny][nx] === '#') {
        return robotPos;
    }

    if (boxes.has(`${ny},${nx}`)) {
        const [by, bx] = [ny + dy, nx + dx];
        if (grid[by][bx] === '#' || boxes.has(`${by},${bx}`)) {
            return robotPos;
        }
        boxes.delete(`${ny},${nx}`);
        boxes.add(`${by},${bx}`);
    }

    return [ny, nx];
}

function simulateWarehouse(warehouse, moves) {
    const { grid, robotPos, boxes } = parseWarehouse(warehouse);
    let currentPos = robotPos;

    for (const move of moves) {
        currentPos = moveRobot(grid, currentPos, boxes, move);
    }

    return boxes;
}

function calculateGPS(boxes, width) {
    let sum = 0;
    boxes.forEach(box => {
        const [y, x] = box.split(',').map(Number);
        sum += 100 * y + x;
    });
    return sum;
}

const boxes = simulateWarehouse(warehouse, moves);
const gpsSum = calculateGPS(boxes, warehouse[0].length);

console.log(gpsSum);

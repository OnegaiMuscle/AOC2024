const fs = require('fs');

const filename = 'inputDay14.txt';
const lines = fs.readFileSync(filename, 'utf8').trim().split('\n');

const width = 101;
const height = 103;
const time = 100;

const robots = lines.map(line => {
    const [p, v] = line.split(' v=');
    const [px, py] = p.slice(2).split(',').map(Number);
    const [vx, vy] = v.split(',').map(Number);
    return { px, py, vx, vy };
});

function simulateRobots(robots, width, height, time) {
    const positions = new Map();

    robots.forEach(robot => {
        let { px, py, vx, vy } = robot;
        px = (px + vx * time) % width;
        py = (py + vy * time) % height;
        if (px < 0) px += width;
        if (py < 0) py += height;
        const key = `${px},${py}`;
        positions.set(key, (positions.get(key) || 0) + 1);
    });

    return positions;
}

function calculateSafetyFactor(positions, width, height) {
    const midX = Math.floor(width / 2);
    const midY = Math.floor(height / 2);

    const quadrants = [0, 0, 0, 0];

    positions.forEach((count, key) => {
        const [x, y] = key.split(',').map(Number);
        if (x !== midX && y !== midY) {
            if (x < midX && y < midY) quadrants[0] += count;
            else if (x >= midX && y < midY) quadrants[1] += count;
            else if (x < midX && y >= midY) quadrants[2] += count;
            else if (x >= midX && y >= midY) quadrants[3] += count;
        }
    });

    return quadrants.reduce((product, count) => product * count, 1);
}

const positions = simulateRobots(robots, width, height, time);
const safetyFactor = calculateSafetyFactor(positions, width, height);

console.log(safetyFactor);

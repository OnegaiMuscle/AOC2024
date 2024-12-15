console.time('Execution Time');

const fs = require('fs');

const filename = 'inputDay14.txt';
const lines = fs.readFileSync(filename, 'utf8').trim().split('\n');

const width = 101;
const height = 103;

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

function checkChristmasTreePattern(positions) {
    const treePattern = [
        "   *   ",
        "  ***  ",
        " ***** ",
        "   *   "
    ];

    const patternHeight = treePattern.length;
    const patternWidth = treePattern[0].length;

    for (let y = 0; y <= height - patternHeight; y++) {
        for (let x = 0; x <= width - patternWidth; x++) {
            let match = true;
            for (let py = 0; py < patternHeight; py++) {
                for (let px = 0; px < patternWidth; px++) {
                    const key = `${x + px},${y + py}`;
                    if (treePattern[py][px] === '*' && !positions.has(key)) {
                        match = false;
                        break;
                    }
                }
                if (!match) break;
            }
            if (match) return true;
        }
    }

    return false;
}

function findFewestSecondsForEasterEgg(robots, width, height) {
    let time = 0;
    while (true) {
        const positions = simulateRobots(robots, width, height, time);
        if (checkChristmasTreePattern(positions)) {
            return time;
        }
        time++;
    }
}

const fewestSeconds = findFewestSecondsForEasterEgg(robots, width, height);
console.log(fewestSeconds);

console.timeEnd('Execution Time');

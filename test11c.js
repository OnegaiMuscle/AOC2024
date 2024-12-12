console.time('Execution Time');

const fs = require('fs');
const filename = 'inputDay11.txt';

function processInput(filename) {
    const input = fs.readFileSync(filename, 'utf8').split('\n');
    const stones = new Map();
    input[0].split(' ').forEach(stone => {
        const stoneValue = parseInt(stone);
        stones.set(stoneValue, (stones.get(stoneValue) || 0) + 1);
    });
    return stones;
}

function blinkTimes(blinks) {
    for (let i = 0; i < blinks; i++) {
        blink();
    }
}

function blink() {
    const stonework = new Map(stones);
    stonework.forEach((count, stone) => {
        if (count === 0) return;
        if (stone === 0) {
            updateStoneCount(1, count);
            updateStoneCount(0, -count);
        } else if (stone.toString().length % 2 === 0) {
            const [stone1, stone2] = splitStone(stone);
            updateStoneCount(stone1, count);
            updateStoneCount(stone2, count);
            updateStoneCount(stone, -count);
        } else {
            const newStone = stone * 2024;
            updateStoneCount(newStone, count);
            updateStoneCount(stone, -count);
        }
    });
}

function updateStoneCount(stone, count) {
    stones.set(stone, (stones.get(stone) || 0) + count);
}

function splitStone(stone) {
    const stoneStr = stone.toString();
    const mid = Math.floor(stoneStr.length / 2);
    const stone1 = parseInt(stoneStr.slice(0, mid));
    const stone2 = parseInt(stoneStr.slice(mid));
    return [stone1, stone2];
}

const stones = processInput(filename);
blinkTimes(25);

console.log();
console.log('Stones =', Array.from(stones.values()).reduce((a, b) => a + b, 0));

console.timeEnd('Execution Time');

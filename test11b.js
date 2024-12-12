console.time('Execution Time');

const fs = require('fs');
const filename = 'inputDay11.txt';

function processInput(filename) {
    const input = fs.readFileSync(filename, 'utf8').split('\n');
    const stones = new Map();
    input[0].split(' ').forEach(stone => {
        stone = parseInt(stone);
        stones.set(stone, (stones.get(stone) || 0) + 1);
    });
    console.log(stones)
    return stones;
}

function blinkTimes(blinks) {
    for (let i = 0; i < blinks; i++) {
        blink();
        //console.log(i, Array.from(stones.values()).reduce((a, b) => a + b, 0));
    }
}

function blink() {
    const stonework = new Map(stones);
    stonework.forEach((count, stone) => {
        if (count === 0) return;
        if (stone === 0) {
            stones.set(1, (stones.get(1) || 0) + count);
            stones.set(0, stones.get(0) - count);
        } else if (stone.toString().length % 2 === 0) {
            const stoneStr = stone.toString();
            const newLen = Math.floor(stoneStr.length / 2);
            const stone1 = parseInt(stoneStr.slice(0, newLen));
            const stone2 = parseInt(stoneStr.slice(newLen));
            stones.set(stone1, (stones.get(stone1) || 0) + count);
            stones.set(stone2, (stones.get(stone2) || 0) + count);
            stones.set(stone, stones.get(stone) - count);
        } else {
            stones.set(stone * 2024, (stones.get(stone * 2024) || 0) + count);
            stones.set(stone, stones.get(stone) - count);
        }
    });
}

const stones = processInput(filename);
blinkTimes(25);

console.log();
console.log('Stones =', Array.from(stones.values()).reduce((a, b) => a + b, 0));

console.timeEnd('Execution Time');

console.time('Execution Time');

const fs = require('fs');
const filename = 'inputDay13.txt';
const lines = fs.readFileSync(filename, 'utf8').trim().split('\n');
const machines = [];
for (let i = 0; i < lines.length; i += 4) {
  const buttonA = lines[i].match(/X\+(\d+), Y\+(\d+)/).slice(1, 3).map(Number);
  const buttonB = lines[i + 1].match(/X\+(\d+), Y\+(\d+)/).slice(1, 3).map(Number);
  const prize = lines[i + 2].match(/X=(\d+), Y=(\d+)/).slice(1, 3).map(Number);
  prize[0] += 10000000000000;
  prize[1] += 10000000000000;
  machines.push({ buttonA, buttonB, prize });
}

function solveClawMachine(buttonA, buttonB, prize) {
    const [ax, ay] = buttonA;
    const [bx, by] = buttonB;
    const [px, py] = prize;

    const denominator = (ax * by - ay * bx);
    if (denominator === 0) {
        return null;
    }

    const a = (px * by - py * bx) / denominator;
    const b = (py * ax - px * ay) / denominator;

    if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0) {
        const cost = a * 3 + b * 1;
        return cost;
    }

    return null;
}

function calculateTotalTokens(machines) {
    let totalTokens = 0;
    let prizesWon = 0;

    for (const machine of machines) {
        const { buttonA, buttonB, prize } = machine;
        const cost = solveClawMachine(buttonA, buttonB, prize);
        if (cost !== null) {
            totalTokens += cost;
            prizesWon++;
        }
    }

    return { totalTokens, prizesWon };
}

const result = calculateTotalTokens(machines);
console.log(result.totalTokens);
console.log(result.prizesWon);

console.timeEnd('Execution Time');


console.time('Execution Time');

const fs = require('fs');
const filename = 'inputDay13.txt';
const lines = fs.readFileSync(filename, 'utf8').trim().split('\n');
const machines = [];
for (let i = 0; i < lines.length; i += 4) {
  const buttonA = lines[i].match(/X\+(\d+), Y\+(\d+)/).slice(1, 3).map(Number);
  const buttonB = lines[i + 1].match(/X\+(\d+), Y\+(\d+)/).slice(1, 3).map(Number);
  const prize = lines[i + 2].match(/X=(\d+), Y=(\d+)/).slice(1, 3).map(Number);
  machines.push({ buttonA, buttonB, prize });
}


function solveClawMachine(buttonA, buttonB, prize) {
    const [ax, ay] = buttonA;
    const [bx, by] = buttonB;
    const [px, py] = prize;

    for (let aCount = 0; aCount <= 100; aCount++) {
        for (let bCount = 0; bCount <= 100; bCount++) {
            const x = aCount * ax + bCount * bx;
            const y = aCount * ay + bCount * by;
            if (x === px && y === py) {
                const cost = aCount * 3 + bCount * 1;
                return cost;
            }
        }
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
console.log(`Total Tokens: ${result.totalTokens}`);
console.log(`Prizes Won: ${result.prizesWon}`);

console.timeEnd('Execution Time');

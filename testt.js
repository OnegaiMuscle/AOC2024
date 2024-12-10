console.time("a")
const fs = require('fs');

const FILENAME = "inputDay07.txt";

function parseInput(filename) {
  const fileContent = fs.readFileSync(filename, 'utf8');
    return fileContent
      .trim()
      .split('\n')
      .map(line => {
            const [num, rest] = line.split(": ");
            return [
                parseInt(num),
                rest.split(' ').map(n => parseInt(n))
            ];
        });
}

function solve(data, part) {
    return data
        .filter(expression => checkExpression(expression, part))
        .reduce((sum, expression) => sum + expression[0], 0);
}

function subtractWords(first, second) {
    return parseInt(second.toString().slice(0, second.toString().length - first.toString().length));
}

function checkExpression(expression, part) {
    const [result, nums] = expression;
    let intermediates = new Set([result]);

    for (const num of [...nums].reverse()) {
        const newIntermediates = new Set();

        for (const intermediate of intermediates) {
            if (intermediate % num === 0) {
                newIntermediates.add(intermediate / num);
            }
            if (intermediate >= num) {
                newIntermediates.add(intermediate - num);
            }
            if (
                part === 2 &&
                num < intermediate &&
                intermediate.toString().endsWith(num.toString())
            ) {
                newIntermediates.add(subtractWords(num, intermediate));
            }
        }
        intermediates = newIntermediates;
    }

    return intermediates.has(0);
}

function main() {
    const data = parseInput(FILENAME);
    console.log(solve(data, 1));
    console.log(solve(data, 2));
}

main();

console.timeEnd("a")

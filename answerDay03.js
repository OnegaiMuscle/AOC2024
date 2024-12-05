console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay03.txt', 'utf8');

function sumValidMultiplication(input) {
  const regex = /mul\((\d+),(\d+)\)/g;
  return Array.from(input.matchAll(regex)).reduce((sum, match) => {
      const [_, a, b] = match;
      return sum + (a * b); //implicit JS coercition
  }, 0);
};

console.log('answer01:', sumValidMultiplication(data));

function sumValidMultiplicationBis(input) {
  const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
  let processing = true;
  return Array.from(input.matchAll(regex)).reduce((sum, match) => {
    const [operator, a, b] = match;
    if (operator === "do()") return (processing = true), sum;
    if (operator === "don't()") return (processing = false), sum;
    return processing ? sum + a * b : sum; //implicit JS coercition
  }, 0);
};

console.log('answer02:', sumValidMultiplicationBis(data));

console.timeEnd('Execution Time');

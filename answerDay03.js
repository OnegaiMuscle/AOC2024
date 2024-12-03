const fs = require('fs');
const data = fs.readFileSync('inputDay03.txt', 'utf8');

function sumValidMultiplication(input) {
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches = Array.from(input.matchAll(regex));

  return matches.reduce((acc, match) => {
      const x = parseInt(match[1], 10);
      const y = parseInt(match[2], 10);
      return acc + (x * y);
  }, 0);
};

const answer01 = sumValidMultiplication(data);
console.log(answer01);


function sumValidMultiplicationbis(input) {
  const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
  const matches = Array.from(input.matchAll(regex));
  let enabled = true;

  return matches.reduce((acc, match) => {
      if (match[0] === "do()") {
          enabled = true;
      } else if (match[0] === "don't()") {
          enabled = false;
      } else if (enabled) {
          const x = parseInt(match[1], 10);
          const y = parseInt(match[2], 10);
          acc += x * y;
      };
      return acc;
  }, 0);
};

const answer02 = sumValidMultiplicationbis(data);
console.log(answer02);

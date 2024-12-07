console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay07.txt', 'utf8');
const equations = data.trim().split('\n');

let sum = 0;
const lines = equations.map(line => line.split(/[: ]+/).map(Number));
lines.forEach(line => {
  const [expected, ...values] = line;
  let size = values.length - 1;
  let totalCombinations = 3 ** size;
  let acc;
  const instructions = [
    (i) => acc += values[i+1],
    (i) => acc *= values[i+1],
    (i) => acc = parseInt(acc.toString() + values[i+1].toString(), 10)
  ];
  for (let i = 0; i < totalCombinations; i++) {
    acc = values[0];
    const bits = [...i.toString(3).padStart(size,'0')];
    for (let j = 0; j < bits.length; j++) {
      const bit = bits[j];
      instructions[bit](j);
      if (acc == expected) return sum += expected;
    };
  };
});
console.log(sum);

console.timeEnd('Execution Time');

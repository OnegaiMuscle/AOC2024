console.time('Execution Time');

const fs = require('fs');
const equations = fs.readFileSync('inputDay07.txt', 'utf8').trim().split('\n');

let sum = 0;
equations.forEach(line => {
  const [expected, ...values] = line.split(/[: ]+/).map(Number);
  let operators = values.length - 1;
  let combinations = 2 ** operators;
  let acc;
  const instructions = [
    (i) => acc += values[i+1],
    (i) => acc *= values[i+1],
  ];
  for (let i = 0; i < combinations; i++) {
    acc = values[0];
    const bits = [...i.toString(2).padStart(operators,'0')];
    for (let j = 0; j < operators; j++) {
      const bit = bits[j];
      instructions[bit](j);
      if (acc == expected) return sum += expected;
    };
  };
});
console.log(sum);

console.timeEnd('Execution Time');

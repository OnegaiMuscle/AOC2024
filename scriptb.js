console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay07.txt', 'utf8').trim().split('\n');
const equations = data.map(equation => equation.split(/[: ]+/).map(Number));
const maxOperators = equations.reduce((max, equation) => Math.max(max, equation.length) , 0) - 2;
const binaryTable = Array(2 ** maxOperators).fill().map((_,i) => i.toString(2))
const instructions = [
  (acc,val) => acc + val,
  (acc,val) => acc * val,
];
function computedata (i, values){
  let operators = values.length - 1;
  return binaryTable[i].padStart(operators, '0').split('').reduce((acc, bit, idx) => {
    return instructions[bit](acc,values[idx+1])
  }, values[0])
}

function testing(expected, combinations, values)  {
  for (let i = 0; i < combinations; i++) {
  if (expected == computedata(i, values)) return expected
  };
  return 0
}
let sum = equations.reduce( (acc,line) => {
  const [expected, ...values] = line;
  let operators = values.length - 1;
  let combinations = 2 ** operators;
  return acc + testing(expected, combinations, values)
  }, 0);
console.log(sum);

console.timeEnd('Execution Time');

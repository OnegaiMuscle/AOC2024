console.time('Execution Time');
const fs = require('fs');
const input = fs.readFileSync('inputDay24.txt', 'utf8').trim().split('\n');
const initialValues = {};
const gates = [];
const dependencies = {};

input.forEach(line => {
  if (line.includes(':')) {
    const [wire, value] = line.split(': ');
    initialValues[wire] = parseInt(value);
  } else if (line.includes('->')) {
    const [inputs, output] = line.split(' -> ');
    gates.push({ inputs, output });
    dependencies[output] = inputs.split(' ').filter(x => x !== 'AND' && x !== 'OR' && x !== 'XOR');
  }
});

const simulateGates = (initialValues, gates, dependencies) => {
  const values = { ...initialValues };
  const ready = new Set(Object.keys(initialValues));
  const pending = gates.slice();

  const getValue = (wire) => values[wire];

  const setValue = (wire, value) => {
    values[wire] = value;
    ready.add(wire);
  };

  const processGate = (gate) => {
    const { inputs, output } = gate;
    const [input1, operator, input2] = inputs.split(' ');

    const value1 = getValue(input1);
    const value2 = getValue(input2);

    if (value1 === undefined || value2 === undefined) {
      return false;
    }

    let result;
    switch (operator) {
      case 'AND':
        result = value1 & value2;
        break;
      case 'OR':
        result = value1 | value2;
        break;
      case 'XOR':
        result = value1 ^ value2;
        break;
      default:
        return false;
    }

    setValue(output, result);
    return true;
  };

  while (pending.length > 0) {
    const nextPending = [];
    for (const gate of pending) {
      if (!processGate(gate)) {
        nextPending.push(gate);
      }
    }
    if (nextPending.length === pending.length) {
      break;
    }
    pending.length = 0;
    pending.push(...nextPending);
  }

  return values;
};

const finalValues = simulateGates(initialValues, gates, dependencies);

const binaryNumber = Object.keys(finalValues)
  .filter(wire => wire.startsWith('z'))
  .sort()
  .map(wire => finalValues[wire])
  .reverse()
  .join('');

const decimalNumber = parseInt(binaryNumber, 2);

console.log(decimalNumber);
console.timeEnd('Execution Time');

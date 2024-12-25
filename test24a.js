const fs = require('fs');

// Lire les données du fichier
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

// Séparer les valeurs initiales des connexions de portes
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

// Fonction pour simuler les portes logiques
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
      break; // Aucun progrès, éviter une boucle infinie
    }
    pending.length = 0;
    pending.push(...nextPending);
  }

  return values;
};

// Simuler les portes logiques
const finalValues = simulateGates(initialValues, gates, dependencies);

// Fonction pour identifier les fils échangés
const identifySwappedWires = (initialValues, gates, dependencies) => {
  const expectedValues = simulateGates(initialValues, gates, dependencies);
  const swappedWires = [];

  gates.forEach(gate => {
    const { inputs, output } = gate;
    const [input1, operator, input2] = inputs.split(' ');

    const value1 = initialValues[input1];
    const value2 = initialValues[input2];

    let expectedResult;
    switch (operator) {
      case 'AND':
        expectedResult = value1 & value2;
        break;
      case 'OR':
        expectedResult = value1 | value2;
        break;
      case 'XOR':
        expectedResult = value1 ^ value2;
        break;
      default:
        return;
    }

    if (expectedValues[output] !== expectedResult) {
      swappedWires.push(output);
    }
  });

  return swappedWires;
};

// Identifier les fils échangés
const swappedWires = identifySwappedWires(initialValues, gates, dependencies);

// Trier les noms des fils échangés et les joindre avec des virgules
const sortedSwappedWires = swappedWires.sort().join(',');

console.log(sortedSwappedWires);

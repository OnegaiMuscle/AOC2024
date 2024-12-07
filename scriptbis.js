console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay07.txt', 'utf8');
const equations = data.trim().split('\n');

function evaluateExpression(numbers, operators) {
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
      if (operators[i - 1] === '+') {
          result += numbers[i];
      } else if (operators[i - 1] === '*') {
          result *= numbers[i];
      } else if (operators[i - 1] === '||') {
          result = parseInt(result.toString() + numbers[i].toString());
      }
  }
  return result;
}

function generateCombinations(elements, length) {
  if (length === 1) return elements.map(el => [el]);
  const combinations = [];
  elements.forEach(el => {
      const smallerCombinations = generateCombinations(elements, length - 1);
      smallerCombinations.forEach(smallerCombination => {
          combinations.push([el, ...smallerCombination]);
      });
  });
  return combinations;
}

function findValidEquations(equations) {
  const operators = ['+', '*', '||'];
  let totalCalibrationResult = 0;

  equations.forEach(equation => {
      const [testValue, numbersStr] = equation.split(': ');
      const testValueNum = parseInt(testValue);
      const numbers = numbersStr.split(' ').map(Number);

      const operatorCombinations = generateCombinations(operators, numbers.length - 1);
      for (const ops of operatorCombinations) {
          if (evaluateExpression(numbers, ops) === testValueNum) {
              totalCalibrationResult += testValueNum;
              break;
          }
      }
  });

  return totalCalibrationResult;
}

// Example input


const result = findValidEquations(equations);
console.log(result);

console.timeEnd('Execution Time');

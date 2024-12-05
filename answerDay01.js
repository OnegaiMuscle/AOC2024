console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay01.txt', 'utf8');
const lines = data.trim().split('\n');

const [leftList, rightList] = lines.reduce((acc, line) => {
  const [left, right] = line.split(/\s+/);
  acc[0].push(left);
  acc[1].push(right);
  return acc;
}, [[], []]);
function calculateTotalDistance(leftInput, rightInput) {
  leftInput.sort((a, b) => a - b); //implicit JS coercition
  rightInput.sort((a, b) => a - b); //implicit JS coercition
  let totalDistance = 0;
  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  };
  return totalDistance;
};

console.log('answer01:', calculateTotalDistance(leftList, rightList));

const valueFrequency = rightList.reduce((acc, value) => {
  acc[value] = (acc[value] || 0) + 1;
  return acc;
}, {});
function similarityScore(leftInput) {
  return leftInput.reduce((sum, value) => {
    return sum + value * (valueFrequency[value] || 0);
  }, 0);
};

console.log('answer02:', similarityScore(leftList));

console.timeEnd('Execution Time');

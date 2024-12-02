const fs = require('fs');
const data = fs.readFileSync('inputDay01.txt', 'utf8');

const lines = data.trim().split('\n');
const [leftList, rightList] = [[], []];
lines.forEach(line => {
  const [left, right] = line.split(/\s+/);
  leftList.push(left);
  rightList.push(right);
});
leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

let answer01 = 0;
for (let i = 0; i < lines.length; i++) {
  answer01 += Math.abs(leftList[i] - rightList[i]); 
  };
console.log(answer01);

const valueFrequency = rightList.reduce((acc, value) => {
  acc[value] = (acc[value] || 0) + 1;
  return acc;
}, {});
const answer02 = leftList.reduce((acc, value) => {
  return acc + value * (valueFrequency[value] || 0);
}, 0);
console.log(answer02);

console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay19.txt', 'utf8').trim().split('\n\n');
const [towelPatterns, designs] = [data[0].split(', '), data[1].split('\n')];

function countDesignCombinations(design, patterns) {
  const dp = Array(design.length + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= design.length; i++) {
    for (const pattern of patterns) {
      if (i >= pattern.length && design.slice(i - pattern.length, i) === pattern) {
        dp[i] += dp[i - pattern.length];
      }
    }
  }
  return dp[design.length];
}

const totalCombinations = designs.reduce((sum, design) => {
  const combinations = countDesignCombinations(design, towelPatterns)
  combinations > 0 ? sum += combinations : sum;
  return sum
  }, 0);
console.log(totalCombinations);

console.timeEnd('Execution Time');

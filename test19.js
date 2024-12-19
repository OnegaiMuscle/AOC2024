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

const [possibleDesignsCount, totalCombinations] = designs.reduce(([sum1, sum2], design) => {
  const combinations = countDesignCombinations(design, towelPatterns)
  combinations ? sum1++ : sum1;
  combinations > 0 ? sum2 += combinations : sum2;
  return [sum1, sum2]
  }, [0,0]);
console.log(possibleDesignsCount, totalCombinations);

console.timeEnd('Execution Time');

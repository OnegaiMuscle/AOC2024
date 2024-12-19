console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay19.txt', 'utf8').trim().split('\n\n');
const [towelPatterns, designs] = [data[0].split(', '), data[1].split('\n')];

function canCreateDesign(design, patterns) {
  const dp = Array(design.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= design.length; i++) {
    for (const pattern of patterns) {
      if (i >= pattern.length && design.slice(i - pattern.length, i) === pattern) {
        dp[i] = dp[i] || dp[i - pattern.length];
      }
    }
  }
  return dp[design.length];
}

const possibleDesignsCount = designs.reduce((sum, design) => {
  canCreateDesign(design, towelPatterns) ? sum++ : sum;
  return sum
}, 0);
console.log(possibleDesignsCount);

console.timeEnd('Execution Time');

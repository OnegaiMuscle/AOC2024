console.time('Execution Time');
const fs = require('fs');
const input = fs.readFileSync('inputDay22.txt', 'utf8').trim().split('\n').map(Number);

const generateNextSecret = (secret) => {
  const mixAndPrune = (value, secret) => {
    let result = (secret ^ value) % 16777216;
    return result < 0 ? result + 16777216 : result;
  };

  secret = mixAndPrune(secret * 64, secret);
  secret = mixAndPrune(Math.floor(secret / 32), secret);
  secret = mixAndPrune(secret * 2048, secret);
  return secret;
};

const generatePricesAndChanges = (initialSecret) => {
  let prices = [];
  let changes = [];
  let secret = initialSecret;

  prices.push(secret % 10);
  for (let i = 0; i < 2000; i++) {
    secret = generateNextSecret(secret);
    let newPrice = secret % 10;
    prices.push(newPrice);
    changes.push(newPrice - prices[prices.length - 2]);
  }

  return { prices, changes };
};

const allData = input.map(secret => generatePricesAndChanges(secret));

const buildChangeIndex = (changes) => {
  const index = new Map();
  for (let i = 0; i < changes.length - 3; i++) {
    const key = `${changes[i]},${changes[i+1]},${changes[i+2]},${changes[i+3]}`;
    if (!index.has(key)) {
      index.set(key, []);
    }
    index.get(key).push(i);
  }
  return index;
};

const findPromisingSequences = () => {
  const sequenceCounts = new Map();

  allData.forEach(({ changes }) => {
    const seen = new Set();
    for (let i = 0; i < changes.length - 3; i++) {
      const key = `${changes[i]},${changes[i+1]},${changes[i+2]},${changes[i+3]}`;
      if (!seen.has(key)) {
        sequenceCounts.set(key, (sequenceCounts.get(key) || 0) + 1);
        seen.add(key);
      }
    }
  });

  return Array.from(sequenceCounts.entries())
    .filter(([_, count]) => count >= input.length * 0.1)
    .map(([seq]) => seq.split(',').map(Number));
};

const evaluateSequence = (sequence) => {
  let total = 0;

  for (const { prices, changes } of allData) {
    for (let i = 0; i <= changes.length - sequence.length; i++) {
      let match = true;
      for (let j = 0; j < sequence.length; j++) {
        if (changes[i + j] !== sequence[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        total += prices[i + sequence.length];
        break;
      }
    }
  }

  return total;
};

const promisingSequences = findPromisingSequences();
let bestScore = 0;
let bestSequence = null;

for (const sequence of promisingSequences) {
  const score = evaluateSequence(sequence);
  if (score > bestScore) {
    bestScore = score;
    bestSequence = sequence;
  }
}

console.log('Best sequence:', bestSequence);
console.log('Maximum bananas:', bestScore);
console.timeEnd('Execution Time');

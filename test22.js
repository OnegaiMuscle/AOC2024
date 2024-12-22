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

const simulateSecrets = (initialSecrets, iterations) => {
  return initialSecrets.map(secret => {
    for (let i = 0; i < iterations; i++) {
      secret = generateNextSecret(secret);
    }
    return secret;
  });
};

const finalSecrets = simulateSecrets(input, 2000);
const sumOfFinalSecrets = finalSecrets.reduce((sum, secret) => sum + secret, 0);

console.log(sumOfFinalSecrets);
console.timeEnd('Execution Time');

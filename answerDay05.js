console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay05.txt', 'utf8');
const [rulesSection, updatesSection] = data.trim().split('\n\n');
const rules = new Set(rulesSection.split('\n'));
const updates = updatesSection.split('\n').map(update => update.split(',').map(Number));

const comparePages = (x, y) => rules.has(`${x}|${y}`) ? -1 : 1; //custom sorting according the rules
const middlePagesSum = updates.reduce((page, update) => {
  const sortedUpdate = [...update].sort(comparePages);
  const middlePage = sortedUpdate[Math.floor(sortedUpdate.length / 2)];
  (update.join(',') === sortedUpdate.join(',')) ? page.valid += middlePage : page.invalid += middlePage;
  return page;
}, {valid: 0, invalid: 0});

console.log('Sum of Middle Pages:', middlePagesSum);

console.timeEnd('Execution Time');

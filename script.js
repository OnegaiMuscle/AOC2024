console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay06.txt', 'utf8');
const lines = data.trim().split('\n');





console.timeEnd('Execution Time');

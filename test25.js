const fs = require("fs");
const input = fs.readFileSync("inputDay25.txt", "utf8").trim().split("\n\n");

const [locksRaw, keysRaw] = input.map(section => section.split("\n")).reduce((acc, curr) => {
  if (curr[0][0] === '#') acc[0].push(curr);
  else acc[1].push(curr);
  return acc;
}, [[], []]);

const fits = (lock, key) => {
  for (let i = 0; i < lock.length; i++) {
    for (let j = 0; j < lock[i].length; j++) {
      if (lock[i][j] === '#' && key[i][j] === '#') {
        return false;
      }
    }
  }
  return true;
};

let count = 0;
locksRaw.forEach(lock => {
  keysRaw.forEach(key => {
    if (fits(lock, key)) {
      count++;
    }
  });
});

console.log(count);

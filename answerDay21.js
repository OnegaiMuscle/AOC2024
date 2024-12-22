console.time('Execution Time');
const fs = require('fs');
const input = fs.readFileSync('inputDay21.txt', 'utf8').trim();
const keycodes = input.split('\n');
const memo = {};

const BFS_DIRECTIONS = {
  '^': { x: 0, y: -1 },
  '>': { x: 1, y: 0 },
  'v': { x: 0, y: 1 },
  '<': { x: -1, y: 0 }
};

const KEYPAD = {
  7: { x: 0, y: 0 },
  8: { x: 1, y: 0 },
  9: { x: 2, y: 0 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  1: { x: 0, y: 2 },
  2: { x: 1, y: 2 },
  3: { x: 2, y: 2 },
  X: { x: 0, y: 3 },
  0: { x: 1, y: 3 },
  A: { x: 2, y: 3 }
};

const DIRECTIONS = {
  X:   { x: 0, y: 0 },
  '^': { x: 1, y: 0 },
  A:   { x: 2, y: 0 },
  '<': { x: 0, y: 1 },
  'v': { x: 1, y: 1 },
  '>': { x: 2, y: 1 },
};

const getCommand = (input, start, end) => {
  const queue = [{ ...input[start], path: '' }];
  const distances = {};

  if (start === end) return ['A'];

  let allPaths = [];
  while (queue.length) {
    const current = queue.shift();
    if (!current) continue;

    if (current.x === input[end].x && current.y === input[end].y) {
      allPaths.push(current.path + 'A');
    }

    if (distances[`${current.x},${current.y}`] < current.path.length) continue;

    Object.entries(BFS_DIRECTIONS).forEach(([direction, vector]) => {
      const position = { x: current.x + vector.x, y: current.y + vector.y };

      if (input.X.x === position.x && input.X.y === position.y) return;

      const button = Object.values(input).find(button => button.x === position.x && button.y === position.y);
      if (button) {
        const newPath = current.path + direction;
        if (!distances[`${position.x},${position.y}`] || distances[`${position.x},${position.y}`] >= newPath.length) {
          queue.push({ ...position, path: newPath });
          distances[`${position.x},${position.y}`] = newPath.length;
        }
      }
    });
  }

  return allPaths.sort((a, b) => a.length - b.length);
};

const getKeyPresses = (input, code, robot, memo) => {
  const key = `${code},${robot}`;
  if (memo[key]) return memo[key];

  let current = 'A';
  let length = 0;
  for (const char of code) {
    const moves = getCommand(input, current, char);
    length += robot === 0 ? moves[0].length : Math.min(...moves.map(move => getKeyPresses(DIRECTIONS, move, robot - 1, memo)));
    current = char;
  }

  memo[key] = length;
  return length;
};

const answer1 = keycodes.reduce((sum, code) => {
  const numerical = parseInt(code.replace(/\D/g, ''), 10);
  return sum + numerical * getKeyPresses(KEYPAD, code, 2, memo);
}, 0);

const answer2 = keycodes.reduce((sum, code) => {
  const numerical = parseInt(code.replace(/\D/g, ''), 10);
  return sum + numerical * getKeyPresses(KEYPAD, code, 25, memo);
}, 0);


console.log(answer1, answer2);
console.timeEnd('Execution Time');
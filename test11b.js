function transformStones(stones) {
  const newStones = [];
  for (const stone of stones) {
      if (stone === 0) {
          newStones.push(1);
      } else if (stone.toString().length % 2 === 0) {
          const halfLength = stone.toString().length / 2;
          const leftHalf = parseInt(stone.toString().slice(0, halfLength));
          const rightHalf = parseInt(stone.toString().slice(halfLength));
          newStones.push(leftHalf, rightHalf);
      } else {
          newStones.push(stone * 2024);
      }
  }
  return newStones;
}

function blinkStones(stones, blinks) {
  let queue = stones.slice();
  for (let i = 0; i < blinks; i++) {
      const nextQueue = [];
      console.log(i)
      while (queue.length > 0) {
          const stone = queue.shift();
          const transformed = transformStones([stone]);
          nextQueue.push(...transformed);
      }
      queue = nextQueue;
  }
  return queue;
}

const initialStones = require('fs').readFileSync('inputDay11.txt', 'utf8').trim().split(' ').map(Number);
console.log(initialStones)
const blinks = 75;
const finalStones = blinkStones(initialStones, blinks);
console.log(finalStones.length);

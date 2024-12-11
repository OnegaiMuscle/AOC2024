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
  for (let i = 0; i < blinks; i++) {
      stones = transformStones(stones);
  }
  return stones;
}

// Exemple d'utilisation
const initialStones = [125, 17];
const blinks = 25;
const finalStones = blinkStones(initialStones, blinks);
console.log(finalStones.length); // Affiche le nombre de pierres après 25 clignements

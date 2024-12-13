const machines = [
  {
      buttonA: [94, 34],
      buttonB: [22, 67],
      prize: [8400, 5400]
  },
  {
      buttonA: [26, 66],
      buttonB: [67, 21],
      prize: [12748, 12176]
  },
  {
      buttonA: [17, 86],
      buttonB: [84, 37],
      prize: [7870, 6450]
  },
  {
      buttonA: [69, 23],
      buttonB: [27, 71],
      prize: [18641, 10279]
  }
];




function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function solveClawMachine(buttonA, buttonB, prize) {
  const [ax, ay] = buttonA;
  const [bx, by] = buttonB;
  const [px, py] = prize;

  for (let aCount = 0; aCount <= 100; aCount++) {
      for (let bCount = 0; bCount <= 100; bCount++) {
          const x = aCount * ax + bCount * bx;
          const y = aCount * ay + bCount * by;
          if (x === px && y === py) {
              const cost = aCount * 3 + bCount * 1;
              return cost;
          }
      }
  }
  return null;
}

function calculateTotalTokens(machines) {
  let totalTokens = 0;
  let prizesWon = 0;

  for (const machine of machines) {
      const { buttonA, buttonB, prize } = machine;
      const cost = solveClawMachine(buttonA, buttonB, prize);
      if (cost !== null) {
          totalTokens += cost;
          prizesWon++;
      }
  }

  return { totalTokens, prizesWon };
}

const result = calculateTotalTokens(machines);
console.log(result.totalTokens);
console.log(result.prizesWon);

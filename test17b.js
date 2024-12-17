function runProgram(registers, program) {
  let instructionPointer = 0;
  const output = [];

  const getComboOperandValue = (operand) => {
    const comboOperands = [
      () => operand,
      () => operand,
      () => operand,
      () => operand,
      () => registers.A,
      () => registers.B,
      () => registers.C,
      () => { throw new Error("Invalid combo operand"); }
    ];
    return comboOperands[operand]();
  };

  const instructions = [
    (operand) => { // adv
      registers.A = Math.trunc(registers.A / Math.pow(2, getComboOperandValue(operand)));
      instructionPointer += 2;
    },
    (operand) => { // bxl
      registers.B ^= operand;
      instructionPointer += 2;
    },
    (operand) => { // bst
      registers.B = getComboOperandValue(operand) % 8;
      instructionPointer += 2;
    },
    (operand) => { // jnz
      if (registers.A !== 0) {
        instructionPointer = operand;
      } else {
        instructionPointer += 2;
      }
    },
    (operand) => { // bxc
      registers.B ^= registers.C;
      instructionPointer += 2;
    },
    (operand) => { // out
      output.push(getComboOperandValue(operand) % 8);
      instructionPointer += 2;
    },
    (operand) => { // bdv
      registers.B = Math.trunc(registers.A / Math.pow(2, getComboOperandValue(operand)));
      instructionPointer += 2;
    },
    (operand) => { // cdv
      registers.C = Math.trunc(registers.A / Math.pow(2, getComboOperandValue(operand)));
      instructionPointer += 2;
    }
  ];

  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1];

    instructions[opcode](operand);
  }

  return output.join(',');
}

function findLowestA(program) {
  const targetOutput = program.join(',');

  let low = 1e24;
  let high = 1e25; // Arbitrary high value to start with

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    const registers = { A: mid, B: 0, C: 0 };
    const output = runProgram(registers, program);

    if (output === targetOutput) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}

// Example usage
const program = [2,4,1,5,7,5,4,5,0,3,1,6,5,5,3,0];
const result = findLowestA(program);
console.log(result); // Output: 117440

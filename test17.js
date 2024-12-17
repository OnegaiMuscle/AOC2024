const registers = { A: (10901993033292), B: 0, C: 0 };
const program = [2,4,1,5,7,5,4,5,0,3,1,6,5,5,3,0];

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

  const adv = (operand) => {
    registers.A = Math.trunc(registers.A / Math.pow(2, getComboOperandValue(operand)));
    instructionPointer += 2;
  };
  const bxl = (operand) => {
    registers.B ^= operand;
    instructionPointer += 2;
  };
  const bst = (operand) => {
    registers.B = getComboOperandValue(operand) % 8;
    instructionPointer += 2;
  };
  const jnz = (operand) => {
    (registers.A !== 0) ? instructionPointer = operand : instructionPointer += 2
  };
  const bxc = (operand) => {
    registers.B ^= registers.C;
    instructionPointer += 2;
  };
  const out = (operand) => {
    output.push(getComboOperandValue(operand) % 8);
    instructionPointer += 2;
  };
  const bdv = (operand) => {
    registers.B = Math.trunc(registers.A / Math.pow(2, getComboOperandValue(operand)));
    instructionPointer += 2;
  };
  const cdv = (operand) => {
    registers.C = Math.trunc(registers.A / Math.pow(2, getComboOperandValue(operand)));
    instructionPointer += 2;
  };

  const instructions = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1];
    instructions[opcode](operand);
  };

  return output.join(',');
};

console.log(runProgram(registers, program));

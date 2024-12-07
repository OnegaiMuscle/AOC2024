

// Exemple d'entrée
const equations = [
  "190: 10 19",
  "3267: 81 40 27",
  "83: 17 5",
  "156: 15 6",
  "7290: 6 8 6 15",
  "161011: 16 10 13",
  "192: 17 8 14",
  "21037: 9 7 18 13",
  "292: 11 6 16 20"
];

const lines = equations.map(line => line.split(/[: ]+/).map(Number));
console.log(lines)
const [expected,...values]=lines[4]
console.log(expected, values)
let size = values.length -1
let taill= 2**size
console.log(size)
let start
const instructions = [
  (i) => start += values[i+1],
  (i) => start *= values[i+1]
]
console.log(taill)
for (let i = 0; i < taill; i++) {
  start = values[0];
  const instr = [...i.toString(2).padStart(size,'0')];
  instr.forEach((bit,index) =>{
    instructions[bit](index)
    console.log(start)
  })
}

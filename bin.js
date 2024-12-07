const lines = [
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

function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (operators[i - 1] === '+') {
            result += numbers[i];
        } else if (operators[i - 1] === '*') {
            result *= numbers[i];
        } else if (operators[i - 1] === '||') {
            result = parseInt(result.toString() + numbers[i].toString());
        }
    }
    return result;
}

function generateBinaryCombinations(length) {
    const combinations = [];
    const totalCombinations = Math.pow(2, length);
    for (let i = 0; i < totalCombinations; i++) {
        const binaryString = i.toString(2).padStart(length, '0');
        combinations.push(binaryString);
    }
    return combinations;
}

function findValidEquations(equations) {
    const operators = ['+', '*', '||'];
    let totalCalibrationResult = 0;

    equations.forEach(equation => {
        const [testValue, ...values] = equation.split(/[: ]+/).map(Number);
        const size = values.length - 1;
        const taille = 2 ** size;

        for (let i = 0; i < taille; i++) {
            let start = values[0];
            const instr = [...i.toString(2).padStart(size, '0')];
            for (let j = 0; j < instr.length; j++) {
                const bit = parseInt(instr[j], 10);
                if (bit === 0) {
                    start += values[j + 1];
                } else {
                    start *= values[j + 1];
                }
            }
            if (start === testValue) {
                totalCalibrationResult += testValue;
                break;
            }
        }
    });

    return totalCalibrationResult;
}

// Exemple d'utilisation
const result = findValidEquations(lines);
console.log(`Total calibration result: ${result}`);

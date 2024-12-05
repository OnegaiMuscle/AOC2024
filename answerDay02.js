console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay02.txt', 'utf8');
const lines = data.trim().split('\n').map(line => line.split(/\s+/).map(Number));
//console.log('10' > '2') returns false

const isSafe = (report) => {
  const isIncreasing = report.every((val, i, arr) => {
    return i === 0 || (val > arr[i - 1] && val - arr[i - 1] >= 1 && val - arr[i - 1] <= 3);
  });
  const isDecreasing = report.every((val, i, arr) => {
    return i === 0 || (val < arr[i - 1] && arr[i - 1] - val >= 1 && arr[i - 1] - val <= 3);
  });
  return isIncreasing || isDecreasing;
};

console.log('answer01:', lines.filter(isSafe).length);

const canBeSafeByRemovingOne = (report) => {
  return report.some((_, i) => {
    const newReport = report.slice(0, i).concat(report.slice(i + 1));
    return isSafe(newReport);
  });
};
const isValid = (report) => {
  return isSafe(report) || canBeSafeByRemovingOne(report);
};

console.log('answer02:', lines.filter(isValid).length);

console.timeEnd('Execution Time');

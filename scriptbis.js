console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay09.txt', 'utf8');
const databis = "2333133121414131402"
function transformDiskMap(diskMap) {
  let result = '';
  let fileId = 0;

  for (let i = 0; i < diskMap.length; i++) {
      const length = parseInt(diskMap[i], 10);
      const type = i % 2 === 0 ? 'file' : 'space';

      for (let j = 0; j < length; j++) {
          result += type === 'file' ? fileId : '.';
      }

      if (type === 'file') fileId++;
  }

  return result;
}

// Exemple d'utilisation
const transformedMap = transformDiskMap(data);
console.log(transformedMap); // Affiche "0..111....22222"

function transformDiskMapbis(diskMap) {
  // Convertir la chaîne en un tableau de caractères
  let blocks = diskMap.split('');

  // Trouver les indices des points et des chiffres
  let points = [];
  let digits = [];
  for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] === '.') {
          points.push(i);
      } else {
          digits.push(i);
      }
  }

  // Remplacer les points par les chiffres en commençant par la fin
  while (points.length > 0 && digits.length > 0) {
      let pointIndex = points.shift();
      let digitIndex = digits.pop();
      blocks[pointIndex] = blocks[digitIndex];
  }

  return blocks.join('');
}

// Exemple d'utilisation
const diskMapbis = "00...111...2...333.44.5555.6666.777.888899";
const transformedMapbis = transformDiskMapbis(transformedMap);
console.log(transformedMapbis); // Affiche "0099811188827773336446555566.............."

function countDots(diskMap) {
  let dotCount = 0;
  for (let i = 0; i < diskMap.length; i++) {
      if (diskMap[i] === '.') {
          dotCount++;
      }
  }
  return dotCount;
}

// Exemple d'utilisation
const dotCount = countDots(transformedMap);
console.log(dotCount); // Affiche le nombre de points

function replaceLastNWithDots(str, n) {
  // Vérifier si la chaîne a au moins n caractères
  if (str.length < n) {
      return str;
  }

  // Enlever les n dernières lettres et les remplacer par des points
  let newStr = str.slice(0, -n) + '.'.repeat(n);
  return newStr;
}

// Exemple d'utilisation
const originalStr = "00...111...2...333.44.5555.6666.777.888899";
const modifiedStr = replaceLastNWithDots(transformedMapbis, dotCount);
console.log(modifiedStr); // Affiche "00...111...2...333.44.5555.6666.777.8888...."



function calculateChecksum(diskMap) {
  // Enlever les points de la carte du disque
  const compactedMap = diskMap.replace(/\./g, '');

  // Calculer le checksum
  let checksum = 0;
  for (let i = 0; i < compactedMap.length; i++) {
      const fileId = parseInt(compactedMap[i], 10);
      checksum += i * fileId;
  }

  return checksum;
}

// Exemple d'utilisation
const diskMap = "0099811188827773336446555566..............";
const checksum = calculateChecksum(modifiedStr);
console.log("Checksum:", checksum); // Affiche 1928






console.timeEnd('Execution Time');

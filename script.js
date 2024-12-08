console.time('Execution Time');

const fs = require('fs');
const data = fs.readFileSync('inputDay08.txt', 'utf8');
const equations = data.trim().split('\n');

function findAntinodes(map) {
  const rows = map.length;
  const cols = map[0].length;
  const antennas = {};

  // Lire la carte et identifier les positions des antennes
  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
          const char = map[r][c];
          if (char !== '.') {
              if (!antennas[char]) antennas[char] = [];
              antennas[char].push([r, c]);
          }
      }
  }

  const antinodes = new Set();

  // Calculer les antinodes pour chaque paire d'antennes de même fréquence
  for (const freq in antennas) {
      const positions = antennas[freq];
      for (let i = 0; i < positions.length; i++) {
          for (let j = i + 1; j < positions.length; j++) {
              const [r1, c1] = positions[i];
              const [r2, c2] = positions[j];
              const dr = r2 - r1;
              const dc = c2 - c1;

              // Calculer les positions des antinodes
              const antinode1 = [r1 - dr, c1 - dc];
              const antinode2 = [r2 + dr, c2 + dc];

              // Ajouter les antinodes à l'ensemble s'ils sont dans les limites de la carte
              if (antinodesInBounds(antinodes, antinode1, rows, cols)) {
                  antinodes.add(antinodesToString(antinodes, antinode1));
              }
              if (antinodesInBounds(antinodes, antinode2, rows, cols)) {
                  antinodes.add(antinodesToString(antinodes, antinode2));
              }
          }
      }
  }

  return antinodes.size;
}

function antinodesInBounds(antinodes, [r, c], rows, cols) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}

function antinodesToString(antinodes, [r, c]) {
  return `${r},${c}`;
}

// Exemple de carte
const map = [
  "............",
  "........0...",
  ".....0......",
  ".......0....",
  "....0.......",
  "......A.....",
  "............",
  "............",
  "........A...",
  ".........A..",
  "............",
  "............"
];

console.log(findAntinodes(equations)); // Affiche le nombre de positions uniques contenant un antinode





console.timeEnd('Execution Time');

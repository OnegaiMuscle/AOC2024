const fs = require('fs');

// Lire les données du fichier
const data = fs.readFileSync('inputDay20.txt', 'utf8').trim().split('\n');
const racetrack = data.map(line => line.split(''));

// Trouver les positions de départ (S) et de fin (E)
let start, end;
for (let i = 0; i < racetrack.length; i++) {
  for (let j = 0; j < racetrack[i].length; j++) {
    if (racetrack[i][j] === 'S') start = [i, j];
    if (racetrack[i][j] === 'E') end = [i, j];
  }
}

// Directions pour les mouvements (haut, bas, gauche, droite)
const directions = [
  [-1, 0], [1, 0], [0, -1], [0, 1]
];

// Fonction pour vérifier si une position est valide
function isValid(x, y, racetrack) {
  return x >= 0 && x < racetrack.length && y >= 0 && y < racetrack[0].length && racetrack[x][y] !== '#';
}

// BFS sans tricherie
function bfs(start, end, racetrack) {
  const queue = [[...start, 0]];
  const visited = new Set();
  visited.add(`${start[0]},${start[1]}`);

  while (queue.length > 0) {
    const [x, y, steps] = queue.shift();
    if (x === end[0] && y === end[1]) return steps;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (isValid(nx, ny, racetrack) && !visited.has(`${nx},${ny}`)) {
        queue.push([nx, ny, steps + 1]);
        visited.add(`${nx},${ny}`);
      }
    }
  }
  return Infinity;
}

// BFS avec tricherie
function bfsWithCheat(start, end, racetrack) {
  const queue = [[...start, 0, false]];
  const visited = new Set();
  visited.add(`${start[0]},${start[1]},false`);

  while (queue.length > 0) {
    const [x, y, steps, cheated] = queue.shift();
    if (x === end[0] && y === end[1]) return steps;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (isValid(nx, ny, racetrack) && !visited.has(`${nx},${ny},${cheated}`)) {
        queue.push([nx, ny, steps + 1, cheated]);
        visited.add(`${nx},${ny},${cheated}`);
      } else if (!cheated && !visited.has(`${nx},${ny},true`)) {
        queue.push([nx, ny, steps + 1, true]);
        visited.add(`${nx},${ny},true`);
      }
    }
  }
  return Infinity;
}

// Trouver le chemin le plus court sans tricherie
const shortestPath = bfs(start, end, racetrack);

// Trouver tous les cheats qui sauvent au moins 100 picosecondes
let cheatCount = 0;
for (let i = 0; i < racetrack.length; i++) {
  for (let j = 0; j < racetrack[i].length; j++) {
    if (racetrack[i][j] === '#') continue;
    const cheatPath = bfsWithCheat([i, j], end, racetrack);
    if (shortestPath - cheatPath >= 100) cheatCount++;
  }
}

console.log(`Nombre de cheats qui sauvent au moins 100 picosecondes : ${cheatCount}`);

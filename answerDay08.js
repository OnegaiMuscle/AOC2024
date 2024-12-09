console.time('Execution Time');

const fs = require('fs');
const grid = fs.readFileSync('inputDay08.txt', 'utf8').trim().split('\n').map(line => line.split(''));

function antennaPositions(grid) {
    const antennas = {};
    grid.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell !== '.') {
                if (!antennas[cell]) antennas[cell] = [];
                antennas[cell].push([x, y]);
            }
        });
    });
    return antennas;
}

function* combinations(arr, k) {
    const n = arr.length;
    if (k > n) return;
    const indices = Array.from({ length: k }, (_, i) => i);
    yield indices.map(i => arr[i]);
    while (true) {
        let i;
        for (i = k - 1; i >= 0 && indices[i] === i + n - k; i--);
        if (i < 0) return;
        indices[i]++;
        for (let j = i + 1; j < k; j++) {
            indices[j] = indices[j - 1] + 1;
        }
        yield indices.map(i => arr[i]);
    }
}

function findAntinodes(antennas, xRange, yRange, resonants = [1]) {
    const antinodes = new Set();
    for (const locations of Object.values(antennas)) {
        for (const [u, v] of combinations(locations, 2)) {
            const [x1, y1] = u;
            const [x2, y2] = v;

            resonants.forEach(resonant => {
                const a1x = x1 + resonant * (x1 - x2);
                const a1y = y1 + resonant * (y1 - y2);
                if (xRange.includes(a1x) && yRange.includes(a1y)) {
                    antinodes.add(`${a1x},${a1y}`);
                }
            });

            resonants.forEach(resonant => {
                const a2x = x2 + resonant * (x2 - x1);
                const a2y = y2 + resonant * (y2 - y1);
                if (xRange.includes(a2x) && yRange.includes(a2y)) {
                    antinodes.add(`${a2x},${a2y}`);
                }
            });
        }
    }
    return antinodes;
}



const antennas = antennaPositions(grid);

let antinodes = findAntinodes(antennas, [...Array(grid[0].length).keys()], [...Array(grid.length).keys()], [1]);
console.log(antinodes.size);

antinodes = findAntinodes(antennas, [...Array(grid[0].length).keys()], [...Array(grid.length).keys()], Array.from({ length: grid.length }, (_, i) => i));
console.log(antinodes.size);

console.timeEnd('Execution Time');

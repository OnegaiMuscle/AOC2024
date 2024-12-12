console.time('Execution Time');

const fs = require('fs');
const filename = 'inputDay12.txt';

map= fs.readFileSync(filename, 'utf8').trim().split('\n').map(line => line.split(''));

function getNeighbors(x, y) {
    return [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
    ];
}

function bfs(map, x, y, visited) {
    const queue = [[x, y]];
    const plantType = map[x][y];
    const region = [];
    let perimeter = 0;

    while (queue.length > 0) {
        const [cx, cy] = queue.shift();
        if (visited[cx][cy]) continue;
        visited[cx][cy] = true;
        region.push([cx, cy]);
        perimeter += 4;

        const neighbors = getNeighbors(cx, cy);
        for (const [nx, ny] of neighbors) {
            if (map[nx] && map[nx][ny] === plantType) {
                perimeter -= 1;
                if (!visited[nx][ny]) {
                    queue.push([nx, ny]);
                }
            }
        }
    }

    return { region, perimeter };
}

function calculateTotalPrice(map) {
    const visited = Array.from({ length: map.length }, () => Array(map[0].length).fill(false));
    const regions = [];

    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            if (!visited[x][y]) {
                const { region, perimeter } = bfs(map, x, y, visited);
                const area = region.length;
                const price = area * perimeter;
                regions.push(price);
            }
        }
    }

    return regions.reduce((total, price) => total + price, 0);
}

console.log(calculateTotalPrice(map));

console.timeEnd('Execution Time');

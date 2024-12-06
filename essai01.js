const input = [
    "....#.....",
    ".........#",
    "..........",
    "..#.......",
    ".......#..",
    "..........",
    ".#..^.....",
    "........#.",
    "#.........",
    "......#..."
];

const directions = {
    '^': { dx: 0, dy: -1, right: '>' },
    'v': { dx: 0, dy: 1, right: '<' },
    '<': { dx: -1, dy: 0, right: '^' },
    '>': { dx: 1, dy: 0, right: 'v' }
};

function findGuardPosition(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (['^', 'v', '<', '>'].includes(map[y][x])) {
                return { x, y, direction: map[y][x] };
            }
        }
    }
    return null;
}

function simulateGuardMovement(map) {
    const visited = new Set();
    let { x, y, direction } = findGuardPosition(map);

    visited.add(`${x},${y}`);

    while (true) {
        const { dx, dy, right } = directions[direction];
        const newX = x + dx;
        const newY = y + dy;

        if (newX < 0 || newY < 0 || newY >= map.length || newX >= map[0].length || map[newY][newX] === '#') {
            direction = right;
        } else {
            x = newX;
            y = newY;
            visited.add(`${x},${y}`);
        }

        if (newX < 0 || newY < 0 || newY >= map.length || newX >= map[0].length) {
            break;
        }
    }

    return visited;
}

console.log(simulateGuardMovement(input)); // Output the number of distinct positions visited
console.log(simulateGuardMovement(input).size)

const fs = require('fs');
const maze = fs.readFileSync('inputDay16.txt', 'utf8').split('\n');

class State {
    constructor(x, y, isVertical, cost) {
        this.x = x;
        this.y = y;
        this.isVertical = isVertical;
        this.cost = cost;
    }

    getKey() {
        return `${this.x},${this.y},${this.isVertical}`;
    }
}

function solveMaze() {
    let start = {x: 0, y: 0}, end = {x: 0, y: 0};
    for(let y = 0; y < maze.length; y++) {
        for(let x = 0; x < maze[0].length; x++) {
            if(maze[y][x] === 'S') start = {x, y};
            if(maze[y][x] === 'E') end = {x, y};
        }
    }

    const queue = [];
    const visited = new Set();

    queue.push(new State(start.x, start.y, 0, 0));

    while(queue.length > 0) {
        queue.sort((a, b) => a.cost - b.cost);
        const current = queue.shift();

        const key = current.getKey();
        if(visited.has(key)) continue;
        visited.add(key);

        if(current.x === end.x && current.y === end.y) {
            return current.cost;
        }

        const moves = getMoves(current.isVertical);
        for(const [dx, dy, newIsVertical, turnCost] of moves) {
            const newX = current.x + dx;
            const newY = current.y + dy;

            if(isValidMove(newX, newY)) {
                const newCost = current.cost + turnCost + 1;
                queue.push(new State(newX, newY, newIsVertical, newCost));
            }
        }
    }
    return Infinity;
}

function getMoves(isVertical) {
    const moves = [];

    if(isVertical) {
        moves.push([0, -1, 1, 0]);
        moves.push([0, 1, 1, 0]);
        moves.push([0, 0, 0, 1000]);
    } else {
        moves.push([-1, 0, 0, 0]);
        moves.push([1, 0, 0, 0]);
        moves.push([0, 0, 1, 1000]);
    }

    return moves;
}



console.log(solveMaze());

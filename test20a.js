const fs = require('fs');

const input = fs.readFileSync('inputDay20.txt', 'utf8')

const init = input => input.split('\n').map(l => l.split(''))
const dist = (a, b) => Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]);
const k = (u, v) => [...u, ...v].join('_');

const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];

const distanceMap = (map, froms, entryDist = 0, wall = '#', path = '.') => {
    const offMap = (x, y) => x < 0 || y < 0 || x >= cols || y >= rows;

    let cols = map[0].length, rows = map.length, cur;
    let filled = map.map(row => row.slice().fill(Infinity)),
        stack = froms.map(from => ({
            pos: [...from],
            dist: entryDist
        }));

    while (cur = stack.shift()) {
        let [cx, cy] = cur.pos;

        if (filled[cy][cx] <= cur.dist) continue;
        filled[cy][cx] = cur.dist;

        DIRS.forEach(([dx, dy]) => {
            let [x, y] = [cx+dx, cy+dy];
            if (offMap(x, y)) return true;
            if (map[y][x] === wall) return true;
            stack.push({
                pos: [x, y],
                dist: cur.dist+1
            })
        })
    }
    return filled;
}

const run = (map, tpTime = 2) => {
    const offMap = (x, y) => x < 0 || y < 0 || x >= cols || y >= rows;

    let cols = map[0].length, rows = map.length, cur;
    let start, end, cheats = {};

    map.forEach((row, y) => row.forEach((v, x) => {
        if (v == '#') return true;
        if (v == 'S') start = [x, y];
        if (v == 'E') end = [x, y];
        map[y][x] = '.';
    }))

    let dmap = distanceMap(map, [start]);

    let pos = start.slice();
    while (pos[0] != end[0] || pos[1] !== end[1]) {
        for (let y = pos[1]-tpTime; y <= pos[1]+tpTime; y++) {
            for (let x = pos[0]-tpTime; x <= pos[0]+tpTime; x++) {
                if (offMap(x, y)) continue;
                let d = dist(pos, [x, y]);
                if (d >= tpTime+1) continue;
                if (map[y][x] !== '.') continue;
                let saved = (dmap[y][x] - dmap[pos[1]][pos[0]]) - d;
                let key = k(pos, [x, y]);
                if (saved > 0) {
                    if (cheats[key] === undefined || cheats[key] < saved) cheats[key] = saved;
                }
            }
        }

        DIRS.some(([dx, dy]) => {
            let [x, y] = [pos[0]+dx, pos[1]+dy];
            if (!offMap(x, y) && dmap[y][x] == dmap[pos[1]][pos[0]]+1) {
                pos = [x, y];
                return true;
            }
            return false;
        })
    }

    return Object.values(cheats).filter(v => v >= 100).length;
}

console.log('p1', run(init(input), 2))
console.log('p2', run(init(input), 20))

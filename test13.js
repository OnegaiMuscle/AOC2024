const fs = require('fs');

function solve(part) {
    let tokens = 0;
    const add = part === 2 ? 10000000000000 : 0;
    const lines = fs.readFileSync('inputDay13.txt', 'utf8').trim().split('\n');

    let x1, y1, x2, y2;

    for (const line of lines) {
        if (line.startsWith("Button")) {
            const l = line.split(" ");
            const a = l[1].split(":")[0];
            if (a === 'A') {
                x1 = parseInt(l[2].slice(2, -1));
                y1 = parseInt(l[3].slice(2));
            } else {
                x2 = parseInt(l[2].slice(2, -1));
                y2 = parseInt(l[3].slice(2));
            }
        } else if (line.startsWith("Prize")) {
            const l = line.split(" ");
            const c = parseInt(l[1].slice(2, -1)) + add;
            const d = parseInt(l[2].slice(2)) + add;

            const a = (c * y2 - d * x2) / (x1 * y2 - y1 * x2);
            const b = (d * x1 - c * y1) / (x1 * y2 - y1 * x2);

            if (Number.isInteger(a) && Number.isInteger(b)) {
                tokens += 3 * a + b;
            }
        }
    }

    console.log(tokens);
}

solve(1);
solve(2);

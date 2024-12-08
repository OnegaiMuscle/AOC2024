// main.js
const fs = require('fs');
const { Worker } = require('worker_threads');

console.time('Execution Time');

const data = fs.readFileSync('inputDay07.txt', 'utf8');
const equations = data.trim().split('\n');
const lines = equations.map(line => line.split(/[: ]+/).map(Number));

const numWorkers = 8; // Nombre de workers à utiliser
const chunkSize = Math.ceil(lines.length / numWorkers);
const workers = [];
let totalSum = 0;
let completedWorkers = 0;

for (let i = 0; i < numWorkers; i++) {
    const worker = new Worker('./worker.js');
    const chunk = lines.slice(i * chunkSize, (i + 1) * chunkSize);

    worker.postMessage({ lines: chunk });
    worker.on('message', (sum) => {
        totalSum += sum;
        completedWorkers++;
        worker.terminate(); // Terminer le worker après avoir reçu le message
        if (completedWorkers === numWorkers) {
            console.log(totalSum);
            console.timeEnd('Execution Time');
        }
    });

    workers.push(worker);
}

// worker.js
const { parentPort } = require('worker_threads');

parentPort.on('message', (data) => {
    const { lines } = data;
    let sum = 0;

    lines.forEach(line => {
        const [expected, ...values] = line;
        let size = values.length - 1;
        let totalCombinations = 3 ** size;
        let acc;

        for (let i = 0; i < totalCombinations; i++) {
            acc = values[0];
            const bits = [...i.toString(3).padStart(size, '0')];

            for (let j = 0; j < bits.length; j++) {
                const bit = bits[j];
                switch (bit) {
                    case '0':
                        acc += values[j + 1];
                        break;
                    case '1':
                        acc *= values[j + 1];
                        break;
                    case '2':
                        acc = parseInt(acc.toString() + values[j + 1].toString(), 10);
                        break;
                }
                if (acc == expected) {
                    sum += expected;
                    break;
                }
            }
        }
    });

    parentPort.postMessage(sum);
});

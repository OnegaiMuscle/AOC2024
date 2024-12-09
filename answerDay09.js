console.time('Execution Time');

const fs = require("fs")
const data = fs.readFileSync("inputDay09.txt", "utf-8").split("").map(Number);

let disk = [], id = 0;
for (let i = 0; i < data.length; i++) {
    if (i % 2 == 0) {
        for (let j = 0; j < data[i]; j++) disk.push(id);
        id++;
    } else for (let j = 0; j < data[i]; j++) disk.push(".");
}

for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] == "." || disk.indexOf(".") > i) continue;
    disk[disk.indexOf(".")] = disk[i];
    disk[i] = ".";
}

let checksum = 0;
for (let i = 0; i < disk.length; i++)
    if (disk[i] != ".") checksum += i * disk[i];

console.log(checksum);

console.timeEnd('Execution Time');

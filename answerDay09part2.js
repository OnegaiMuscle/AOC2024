console.time('Execution Time');

const fs = require("fs");
const data = fs.readFileSync("inputDay09.txt", "utf-8").split("").map(Number);

const createDisk = (data) => {
    let disk = [], id = 0;
    data.forEach((value, i) => {
        const block = { id: i % 2 === 0 ? id++ : ".", length: value };
        disk.push(block);
    });
    return disk;
};

const compactFiles = (disk) => {
    for (let i = disk.length - 1; i >= 0; i--) {
        const file = disk.findIndex(block => block.id === i);
        if (file === -1) continue; // Vérifier si le fichier existe
        const free = disk.findIndex(block => block.id === "." && block.length >= disk[file].length);
        if (free === -1 || file < free) continue; // Vérifier si l'espace libre existe et est valide
        if (disk[free].length > disk[file].length) {
            disk = [
                ...disk.slice(0, free),
                { id: disk[file].id, length: disk[file].length },
                { id: ".", length: disk[free].length - disk[file].length },
                ...disk.slice(free + 1)
            ];
            disk[file + 1].id = ".";
        } else if (disk[free].length === disk[file].length) {
            disk[free].id = disk[file].id;
            disk[file].id = ".";
        }
    }
    return disk;
};

const mergeFreeSpaces = (disk) => {
    for (let j = 0; j < disk.length - 1; j++) {
        if (disk[j].id === "." && disk[j + 1].id === ".") {
            disk = [
                ...disk.slice(0, j),
                { id: ".", length: disk[j].length + disk[j + 1].length },
                ...disk.slice(j + 2)
            ];
            j--;
        }
    }
    return disk;
};

const calculateChecksum = (disk) => {
    let block = 0, checksum = 0;
    disk.forEach(({ id, length }) => {
        if (id === ".") {
            block += length;
        } else {
            for (let j = 0; j < length; j++) {
                checksum += block * id;
                block++;
            }
        }
    });
    return checksum;
};

let disk = createDisk(data);
disk = compactFiles(disk);
disk = mergeFreeSpaces(disk);
const checksum = calculateChecksum(disk);

console.log(checksum);
console.timeEnd('Execution Time');

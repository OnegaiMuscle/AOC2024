const fs = require('fs');

// Lire le fichier et créer le tableau D
const data = fs.readFileSync('inputDay09.txt', 'utf8').trim();
let D = [];
for (let i = 0; i < data.length; i++) {
    const d = parseInt(data[i], 10);
    D.push([(i % 2 === 0 ? 0 : Math.floor(i / 2) + 1), d]);
}

// Boucle pour compacter les fichiers
for (let i = D.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
        const [i_data, i_size] = D[i];
        const [j_data, j_size] = D[j];

        if (i_data && !j_data && i_size <= j_size) {
            D[i] = [0, i_size];
            D[j] = [0, j_size - i_size];
            D.splice(j, 0, [i_data, i_size]);
        }
    }
}

// Fonction pour aplatir le tableau
const flatten = (arr) => arr.reduce((acc, val) => acc.concat(Array(val[1]).fill(val[0])), []);

// Calculer le checksum
const flattened = flatten(D);
const checksum = flattened.reduce((sum, val, idx) => sum + (val ? idx * (val - 1) : 0), 0);

console.log(checksum);

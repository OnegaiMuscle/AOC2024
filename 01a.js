const fs = require('fs');

// Lire le fichier data.txt
fs.readFile('01data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Séparer les lignes et les colonnes
    const lines = data.trim().split('\n');
    const column1 = [];
    const column2 = [];

    lines.forEach(line => {
        const [col1, col2] = line.split(/\s+/).map(Number);
        column1.push(col1);
        column2.push(col2);
    });

    // Trier les colonnes par ordre croissant
    column1.sort((a, b) => a - b);
    column2.sort((a, b) => a - b);

    // Calculer la somme des valeurs absolues des différences
    let sum = 0;
    for (let i = 0; i < column1.length; i++) {
        sum += Math.abs(column1[i] - column2[i]);
    }

    console.log('Array de la première colonne trié:', column1);
    console.log('Array de la deuxième colonne trié:', column2);
    console.log('Somme des valeurs absolues des différences:', sum);
});

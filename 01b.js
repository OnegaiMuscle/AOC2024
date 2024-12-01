const fs = require('fs');
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

    // Calculer le produit des valeurs de la première colonne par le nombre de fois qu'elles apparaissent dans la deuxième colonne
    let result = 0;
    column1.forEach(value => {
        const count = column2.filter(val => val === value).length;
        result += value * count;
    });

    console.log('Array de la première colonne trié:', column1);
    console.log('Array de la deuxième colonne trié:', column2);
    console.log('Résultat:', result);
});

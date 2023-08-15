const { readFileSync, writeFileSync, existsSync } = require('fs');


const leerJson = (path) => {
    if (!existsSync(path)) {
        writeFileSync(path, JSON.stringify([], null, 5));
        return [];
    }
    return JSON.parse(readFileSync(path, 'utf-8'));
}
const escribirJson = (usuarios, path) => {
    writeFileSync(path, JSON.stringify(usuarios, null, 5));
}
module.exports = {
    leerJson,
    escribirJson,
}
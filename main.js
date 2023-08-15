const ProductManager = require('./modules/ProductManager');
let path = './data/usuarios.json';
const pm = new ProductManager(path);


console.log(pm.getProducts());
pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc1234", 25);
pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc12345", 25);
pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc12345", 25);
pm.deleteProductById(3);
// pm.modifyProductById(3, "producto prueba modificado", "Este es un producto prueba", 200, "Sin imagen", "abc12345", 25);
// console.log(pm.getProductById(3));
// console.log(pm.getProducts());


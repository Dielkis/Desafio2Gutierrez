const ProductManager = require('./ProductManager.js');


const path = './data/productos.json';

pm = new ProductManager(path);

const express = require('express');

const app = express();

PORT = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.end("....INICIO...")
})

app.get('/products', async (req, res) => {
    const products = await pm.getProducts()
    if (req.query.limit) {
        res.send(products.slice(0, +req.query.limit));
        return;
    }
    res.send(products);
});
app.get('/products/:pid', async (req, res) => {
    const products = await pm.getProductById(+req.params.pid)
    res.send(products);
});

// app.post('/products', async (req, res) => {
//     let { title, description, price, thumbnail, code, stock } = req.body
//     let products = await this.getProducts();

//         if (products.find(item => item.product.code === code)) {
//             return console.log(`El producto con el code: ${code} ya esta registrado.`);
//         }
//         products.push({
//             product: new Producto(title, description, price, thumbnail, code, stock),
//             id: products.length === 0 ? 1 : products[products.length - 1].id + 1
//         });
//         await escribirJson(this.path, products);
//         return console.log('El producto se ha agregado con exito');
// })



// app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));







// const entorno = async () => {
//     const path = './data/productos.json';
//     pm = new ProductManager(path);
//     console.log(await pm.getProducts())};
// await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
// // await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc1234", 25);
// // await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc12345", 25);
// // await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123456", 25);
// // console.log(await pm.getProductById(1));
// // await pm.deleteProductById(4);
// // console.log(await pm.modifyProductById(10, "producto prueba modificado", "Este es un producto prueba", 200, "Sin imagen", "abc12345", 25))
// // }
// entorno();


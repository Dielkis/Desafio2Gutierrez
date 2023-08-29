const ProductManager = require('./ProductManager.js');
const path = './data/productos.json';
pm = new ProductManager(path);
const productsRouter = require("./apiProduct.js")
const cartRouter = require("./apiCarts.js")
const express = require('express');
const app = express();
PORT = 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)



app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));



const express = require('express');
const path = require('path');
const fs = require('fs');

let ruta = path.join(__dirname, "..", 'data', 'productos.json');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Crea un nuevo producto 

//Esta es la ruta RAIZ POST
app.post('/api/carts', (req, res) => {
    console.log("POST /api/products");
    //quiero agregar un nuevo productos con los campos id: number/string con el id que se autogenere y sin que se repita el id en el archivo
    // que incluya title, description, price, thumbnail, code, stock, status, category
    // status: true por defecto


})

//Escribe el carrito vacio 

function getProductos() {
    if (fs.existsSync(ruta)) {
        return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
    } else {
        return [];
    }
}
//Esta es la ruta GET
app.get('/:cid', (req, res) => {
    console.log(`GET /api/${req.params.cid}`);
    //debera listar los productos que pertenezcan al carrito con el parametro cid proporcionado
    let products = getProductos();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ data: products });
});

//Esta es la ruta POST
app.post('/:ci/product/:pid', (req, res) => {
    console.log("/api/product")
    //debera agregar el producto al arreglo product del carrito seleccionado , agregandose como un objeto bajo el siguiente formato
    // products: solo debe contener el id del producto
    //y quantity debe contener el numero de ejemplares de dicho producto
    // si un producto ya existe se incrementa la cantidad del mismo
})
const server = app.listen(PORT, () => {
    console.log(`Server escuchando en http://localhost:${PORT}`);
});
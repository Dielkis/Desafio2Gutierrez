const express = require('express');
const path = require('path');
const fs = require('fs');


let ruta = path.join(__dirname, "..", 'data', 'productos.json');


const router = express.Router()


//Obtiene los productos
function getProductos() {
    if (fs.existsSync(ruta)) {
        return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
    } else {
        return [];
    }
}
//Guarda los productos
function saveProductos(products) {
    try {
        fs.writeFileSync(ruta, JSON.stringify(products, null, 5));
        console.log("Producto guardado exitosamente");
    } catch (error) {
        console.error("Error al guardar producto:", error);
    }
}
router.get('/', async (req, res) => {
    const products = await pm.getProducts()
    if (req.query.limit) {
        res.send(products.slice(0, +req.query.limit));
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ data: products });
});

router.get('/:pid', async (req, res) => {
    const products = await pm.getProductById(+req.params.pid)
    res.send(products);
});

// Crea un nuevo producto 
router.post('/', (req, res) => {

    let { title, description, price, thumbnail, code, stock } = req.body;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Datos incompletos en el cuerpo de la petición");
        return res.status(400).json({ error: 'Complete todos los campos por el body' });
    }

    let products = getProductos();

    // Valida si el producto ya existe por su código
    let existingProduct = products.find(product => product.code === code);
    if (existingProduct) {
        return res.status(400).json({ error: `Ya existe un producto con el code ${code}` });
    }
    // Asignar un id unico por cada producto
    let id = 1;
    if (products.length > 0) {
        id = products[products.length - 1].id + 1;
    }

    let nuevoProducto = {
        id, title, description, price, thumbnail, code, stock
    }

    products.push(nuevoProducto);

    saveProductos(products);

    res.status(201).json({ nuevoProducto });
})

// Modifica  productos ya cargados 
router.put('/:id', (req, res) => {

    let id = parseInt(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El id debe ser numerico' })
    }

    let { title, description, price, thumbnail, code, stock } = req.body

    if (!title && !description && !price && !thumbnail && !code && !stock) {
        return res.status(400).json({ error: 'Complete el campo a modificar en el body' })
    }


  //Valida si el id existe
    let products = getProductos()

    let indice = products.findIndex(usuario => usuario.id === id)
    if (indice === -1) {
        return res.status(400).json({ error: `El id ${id} no existe` })
    }

    if (title) {
        products[indice].title = title
    }

    if (description) {
        products[indice].description = description
    }
    if (price) {
        products[indice].price = price
    }
    if (thumbnail) {
        products[indice].thumbnail = thumbnail
    }
    if (code) {
        products[indice].code = code
    }
    if (stock) {
        products[indice].stock = stock
    }

    saveProductos(products)

    res.status(200).json({ usuarioModificado: products[indice] })


})

//Elimina productos completos 
router.delete('/:id', (req, res) => {

    let id = parseInt(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El id debe ser numerico' })
    }

    let product = getProductos()

    let indice = product.findIndex(usuario => usuario.id === id)
    if (indice === -1) {
        return res.status(400).json({ error: `El id ${id} no existe` })
    }

    let productoEliminado = product.splice(indice, 1)

    saveProductos(product)

    res.status(200).json({ productoEliminado })


})

module.exports = router;
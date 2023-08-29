const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const CartManager = require ("./CartManager") 
let ruta = path.join(__dirname, "..", 'data', 'carritos.json');

cm = new CartManager(ruta)


router.get("/", (req,res)=>{
    res.send("OK")
})
//Esta es la ruta RAIZ POST
router.post('/', async (req, res) => {
   await cm.crearCarrito()
})

//Esta es la ruta GET
router.get('/:cid', async (req, res) => {
    const products = await cm.getCartById(+req.params.cid)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ data: products });
});

//Esta es la ruta POST
router.post('/:cid/product/:pid', async (req, res) => {
const resultado = await cm.addProduct(+req.params.cid, +req.params.pid)
res.send(resultado);
})

module.exports = router
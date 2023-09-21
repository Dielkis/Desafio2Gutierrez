const express = require("express");
const router = express.Router();
const ProductManager = require("../modules/ProductManager.js");
pm= new ProductManager();

router.get("/", async (req, res)=>{
    const products = await pm.getProducts();
    
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('home', {
        title: 'Pagina de Inicio',
        products 
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await pm.getProducts();
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render('realTimeProducts', { title: 'Productos del Menu', products })
})

module.exports = router;
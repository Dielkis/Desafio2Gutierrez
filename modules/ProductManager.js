const { leerJson, escribirJson } = require('../data/index');
const Product = require('../modules/Producto');

class ProducManager {
    constructor(path) {
        this.path = path;
        this.products = leerJson(this.path);
    }
    getProducts() {
        return this.products;
    }
    getId() {
        if (this.products.length === 0) {
            return 1;
        }

        return this.products[this.products.length - 1].id + 1;

    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.find(item => item['product'].code === code)) {
            return console.log(`El producto con el code: ${code} ya existe.`);
        }
        this.products.push({ product: new Product(title, description, price, thumbnail, code, stock), id: this.getId() });
        escribirJson(this.products, this.path);
        return console.log('El producto se agrego exitosamente');
    }
    getProductById(productId) {
        const product = this.products.find((item) => item['id'] === productId)
        if (product) {
            return product;
        }
        return 'Not found';
    }
    deleteProductById(productId) {
        if (this.products.find(item => item.id === productId)) {
            this.products = this.products.filter(item => item.id !== productId);
            escribirJson(this.products, this.path);
            console.log('Se elimino el producto correctamente');
            return;
        }
        console.log('Not found');
    }
    modifyProductById(productId, title, description, price, thumbnail, code, stock) {
        const producto = this.getProductById(productId);
        if (producto !== 'Not found') {
            producto.product = new Product(title, description, price, thumbnail, code, stock)
            escribirJson(this.products, this.path);
            console.log('El producto se modifico correctamente');
            return;
        }
        console.log(producto);
        return;
    }
}

module.exports = ProducManager;
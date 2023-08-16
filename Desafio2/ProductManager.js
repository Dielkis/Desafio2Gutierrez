const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.products = JSON.parse(fs.readFileSync(path, 'utf-8'));
        this.path = path;
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'));
    }

    async getProduct() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        } else {
            return [];
        }
    }
    // Eliminar un producto por su ID
    deleteProduct(id) {
        const existe = this.products.find(product => product.id === id);
        if (!existe) {
            console.log(`Error: No se encontró ningún producto con el ID ${id}.`);
            return;
        }
        console.log(this.products)
        this.products = this.products.filter(product => product.id !== id); // Eliminar el producto de la lista
        console.log(this.products)
        this.saveProducts(); // Guardar cambios después de eliminar
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        let nuevoProducto = {
            title: title,
            description: description,
            price: parseInt(price),
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: null
        };

        if (this.products.length === 0) {
            nuevoProducto.id = 1;
        } else {
            nuevoProducto.id = this.products[this.products.length - 1].id + 1;
        }
        const existe = this.products.find(product => product.code === nuevoProducto.code);

        if (!existe) {
            this.products.push(nuevoProducto);
            this.saveProducts();
            console.log(`El producto fue ${nuevoProducto.code} registrado exitosamente`);
            return;
        }
        console.log(`El producto ${nuevoProducto.code} ya existe`);
        return;
    }
    async getProductsById(id) {
        let indiceProducto = this.products.find(producto => producto.id === id);
        if (indiceProducto) {
            return indiceProducto; // Deberías retornar un valor aquí si no existe el producto
        }
        return 'No existe';
    }
}

const entorno = async () => {
    let path = "./recursos/productos.json";
    let productManager = new ProductManager(path);

    await productManager.addProduct("Monitor", "Monitor Gamer UltraGear™ 23.8in FHD IPS", 400, "sin imagen", 'abc123', 25);
    // await productManager.addProduct("Teclado", "Teclado Gamer UltraGear™", 59, "sin imagen", 'abc1234', 10)
    // await productManager.addProduct("Mouse", "Moouse Gamer UltraGear™", 60, "sin imagen", 'abc12345', 15)
    // console.log(await productManager.getProductsById(4));
    // productManager.deleteProduct(5);
    // console.log(await productManager.getProduct());
    // console.log(productManager.products)
}

entorno();


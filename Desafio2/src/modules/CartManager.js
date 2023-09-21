const { leerJson, escribirJson, existe } = require('../data/index');

const Cart = require("./Cart.js")

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        if (existe(this.path)) {
            return JSON.parse(await leerJson(this.path));
        }
        return [];
    }

    async crearCarrito(){
        let carritos= await this.getCarts();
        carritos.push(new Cart(carritos.length === 0 ? 1 : carritos[carritos.length - 1].cid + 1))

        escribirJson(this.path, carritos)
    
    }

    async addProduct(cid, pid) {
        let carts = await this.getCarts(cid);
        let cart = carts.find((cart) => cart.cid === cid);
        if (!cart) return 'Cart no found';

        if (cart.products.length > 0) {
            const product = cart.products.find(cart => cart.product === pid);
            if (product) {
                product.quantity += 1;
                await escribirJson(this.path, carts);
                return "Se agrego una unidad";
            }
        }
        cart.products.push({ product:pid, quantity: 1 });
        await escribirJson(this.path, carts);
        return "Producto agregado exitosamente"
    }

    async getCartById(cid) {
        const cart= (await this.getCarts()).find((item) => item.cid === cid)
        if (cart) {
            return cart;
        }
        return 'error 404 - Not found';
    }
    
}

module.exports = CartManager
const express = require('express');
const router = express.Router();

// Clase Cart (para representar un carrito de compra)
class Cart {
    constructor() {
        this.id = generateCartId();
        this.products = [];
    }
}

let nextCartId = 1;
let carts = [];

// para crear un nuevo carrito de compra
function createCart() {
    const newCart = new Cart();
    carts.push(newCart);
    return newCart;
}

//  para obtener todos los carritos de compra
function getAllCarts() {
    return carts;
}

//  para obtener un carrito de compra por su ID
function getCartById(cartId) {
    return carts.find(cart => cart.id === cartId);
}

//  para agregar un producto a un carrito de compra
function addProductToCart(cartId, productId, quantity) {
    const cart = getCartById(cartId);
    if (cart) {
        cart.products.push({ productId, quantity });
        return cart;
    }
    return null;
}

//  para generar un nuevo ID de carrito
function generateCartId() {
    return nextCartId++;
}

// Ruta raiz para obtener todos los carritos de compra
router.get('/', (req, res) => {
    const carts = getAllCarts();
    res.json(carts);
});

// ruta para obtener un carrito de compra por su ID
router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = getCartById(cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Cart not found' });
    }
});

// ruta para crear un nuevo carrito de compra
router.post('/', (req, res) => {
    const newCart = createCart();
    res.status(201).json(newCart);
});

// Ruta para agregar un producto a un carrito de compra
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const productId = parseInt(pid);
    const cart = addProductToCart(cartId, productId, quantity);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Cart not found' });
    }
});

module.exports = router;
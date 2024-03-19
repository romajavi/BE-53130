const express = require('express');
const router = express.Router();

// iuta raiz GET para listar todos los productos
router.get('/', async (req, res) => {
    try {
        // aquí la lógica para obtener y enviar los productos
        res.json({ message: 'List of products' });
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta GET para obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    try {
        // para obtener y enviar un producto por su ID
        res.json({ message: 'Product details' });
    } catch (error) {
        console.error('Error al obtener producto por ID:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ruta POST para agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        // logica para agregar un nuevo producto
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error al agregar producto:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta PUT para actualizar un producto por su ID
router.put('/:pid', async (req, res) => {
    try {
        // lógica para actualizar un producto por su ID
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error al actualizar producto:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta DELETE para eliminar un producto por su ID
router.delete('/:pid', async (req, res) => {
    try {
        // lógica para eliminar un producto por su ID
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error al eliminar producto:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
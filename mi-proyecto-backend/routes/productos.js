const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener todos los productos
router.get('/', (req, res) => {
    db.query('SELECT * FROM productos', (err, result) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).send({ message: 'Error al obtener productos.' });
        } else {
            console.log('Productos obtenidos correctamente:', result);
            res.status(200).send(result);
        }
    });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const getProductQuery = 'SELECT * FROM productos WHERE id = ?';

    db.query(getProductQuery, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener el producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Producto no encontrado' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;

    const insertQuery = 'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [nombre, descripcion, precio, stock], (err, result) => {
        if (err) {
            console.error('Error al agregar el producto:', err);
            res.status(500).json({ message: 'Error al agregar el producto.' });
        } else {
            console.log('Producto agregado correctamente:', result);
            res.status(201).json({ message: 'Producto agregado correctamente.' });
        }
    });
});

// Actualizar un producto
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const { nombre, descripcion, precio, stock } = req.body;

    const updateQuery = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?';
    db.query(updateQuery, [nombre, descripcion, precio, stock, productId], (err, result) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            res.status(500).json({ message: 'Error al actualizar el producto.' });
        } else {
            console.log('Producto actualizado correctamente:', result);
            res.status(200).json({ message: 'Producto actualizado correctamente.' });
        }
    });
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
    const productId = req.params.id;

    const deleteQuery = 'DELETE FROM productos WHERE id = ?';
    db.query(deleteQuery, [productId], (err, result) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            res.status(500).json({ message: 'Error al eliminar el producto.' });
        } else {
            console.log('Producto eliminado correctamente:', result);
            res.status(200).json({ message: 'Producto eliminado correctamente.' });
        }
    });
});

module.exports = router;

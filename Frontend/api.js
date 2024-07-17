// api.js

// Función para obtener un producto por su ID desde el servidor
async function getProductById(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener el producto');
        }

        const producto = await response.json();
        return producto;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return null;
    }
}

// Función para actualizar un producto en el servidor
async function actualizarProducto(id, nombre, descripcion, precio, stock) {
    try {
        const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ nombre, descripcion, precio, stock })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }

        alert('Producto actualizado correctamente.');
        cargarProductos(); // Vuelve a cargar la lista de productos después de la actualización
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        alert('Hubo un error al actualizar el producto. Por favor, inténtalo de nuevo.');
    }
}

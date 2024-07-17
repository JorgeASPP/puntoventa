// editar_producto.js

document.addEventListener('DOMContentLoaded', () => {
    const editarProductoForm = document.getElementById('editarProductoForm');
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id');
    const productId = params.get('id');


    cargarProducto(productoId);

    editarProductoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const stock = parseInt(document.getElementById('stock').value, 10);
    
        const productoActualizado = {
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            stock: stock
        };
    
        await actualizarProducto(productoId, productoActualizado);
    });
    
});

async function cargarProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('No se pudo obtener el producto para editar.');
        }

        const producto = await response.json();
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('stock').value = producto.stock;
    } catch (error) {
        console.error('Error al cargar producto para editar:', error);
        alert('Hubo un error al cargar el producto para editar. Por favor, inténtalo de nuevo.');
    }
}

async function actualizarProducto(id, producto) {
    try {
        const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error('No se pudo actualizar el producto.');
        }

        console.log('Producto actualizado correctamente.');

        // Aquí podrías redirigir o realizar alguna acción adicional después de la actualización
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        alert('Hubo un error al actualizar el producto. Por favor, inténtalo de nuevo.');
    }
}

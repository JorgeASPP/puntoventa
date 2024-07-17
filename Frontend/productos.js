document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const cerrarSesion = document.getElementById('cerrarSesion');
    const userName = document.getElementById('userName');
    const btnAgregarProducto = document.getElementById('btnAgregarProducto');

    cerrarSesion.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        window.location.href = 'login.html';
    });

    btnAgregarProducto.addEventListener('click', () => {
        window.location.href = 'agregar-producto.html';
    });

    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html'; // Redirige al usuario al login si no hay token
    } else {
        cargarProductos(); // Carga los productos si hay token válido
    }

    async function cargarProductos() {
        try {
            const response = await fetch('http://localhost:3000/api/productos', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de productos.');
            }

            const productos = await response.json();
            mostrarProductos(productos);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            alert('Hubo un error al obtener la lista de productos. Por favor, recarga la página.');
        }
    }

    function mostrarProductos(productos) {
        userName.textContent = localStorage.getItem('nombre');
        content.innerHTML = `
            <h2>Lista de Productos</h2>
            <table class="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="productosList">
                    ${productos.map(producto => `
                        <tr>
                            <td>${producto.id}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.descripcion}</td>
                            <td>$${producto.precio}</td>
                            <td>${producto.stock}</td>
                            <td>
                                <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                                <button onclick="editarProducto(${producto.id})">Actualizar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Función para eliminar un producto
    async function eliminarProducto(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/productos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo eliminar el producto.');
            }

            cargarProductos(); // Recargar la lista de productos después de eliminar
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Hubo un error al eliminar el producto. Por favor, inténtalo de nuevo.');
        }
    }

    // Función para redirigir a la página de edición de producto con el ID proporcionado
    window.editarProducto = function(id) {
        window.location.href = `editar_producto.html?id=${id}`;
    }
});



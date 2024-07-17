document.addEventListener('DOMContentLoaded', () => {
    const userName = document.getElementById('userName');
    const cerrarSesion = document.getElementById('cerrarSesion');
    const listaProductosBtn = document.getElementById('listaProductosBtn');
    const agregarProductoBtn = document.getElementById('agregarProductoBtn');

    // Evento para cerrar sesión
    cerrarSesion.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

    // Evento para redirigir a Lista de Productos
    listaProductosBtn.addEventListener('click', () => {
        window.location.href = 'productos.html';
    });

    // Evento para redirigir a Agregar Producto
    agregarProductoBtn.addEventListener('click', () => {
        window.location.href = 'agregar-producto.html';
    });

    // Mostrar el nombre de usuario almacenado en el localStorage
    userName.textContent = localStorage.getItem('nombre');
});

// Manejador de eventos para el formulario de agregar producto
document.getElementById('formAgregarProducto').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);

    // Objeto con los datos del producto
    const nuevoProducto = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        stock: stock
    };

    // Enviar los datos al servidor mediante fetch o axios
    fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al agregar el producto');
        }
        // Redirigir a la página de productos después de agregar exitosamente
        window.location.href = 'productos.html';
    })
    .catch(error => {
        console.error('Error:', error);
        // Manejar el error apropiadamente, por ejemplo, mostrar un mensaje al usuario
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/usuarios/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, email, password })
            });

            if (!response.ok) {
                throw new Error('Error al registrar usuario');
            }

            alert('Registro exitoso. Por favor, inicia sesión.');
            window.location.href = 'login.html'; // Redirigir al login después del registro
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.');
        }
    });
});

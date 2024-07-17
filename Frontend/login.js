document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);

            // Redirigir a la página de productos
            window.location.href = 'productos.html';
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        }
    });
});


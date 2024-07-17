const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware para parsear JSON y datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para registrar un nuevo usuario
app.post('/api/usuarios/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).send({ message: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const insertQuery = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [nombre, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).send({ message: 'Error al registrar usuario' });
            }
            console.log('Usuario registrado correctamente:', result);
            res.status(201).send({ message: 'Usuario registrado correctamente' });
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send({ message: 'Error en el servidor al procesar la solicitud' });
    }
});

// Ruta para iniciar sesión (login)
app.post('/api/usuarios/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, result) => {
            if (err) {
                console.error('Error al buscar usuario:', err);
                return res.status(500).send({ message: 'Error al buscar usuario.' });
            } else if (result.length > 0) {
                const user = result[0];
                console.log('Usuario encontrado:', user);

                // Comparar la contraseña ingresada con la almacenada en la base de datos
                const match = await bcrypt.compare(password, user.password);

                if (match) {
                    // Generar token JWT si las contraseñas coinciden
                    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    console.log('Token generado:', token);
                    res.status(200).send({ token });
                } else {
                    // Si las contraseñas no coinciden, enviar mensaje de credenciales inválidas
                    console.log('Credenciales inválidas. Contraseña incorrecta.');
                    res.status(401).send({ message: 'Credenciales inválidas' });
                }
            } else {
                // Si no se encuentra ningún usuario con el email proporcionado, enviar mensaje correspondiente
                console.log('Usuario no encontrado. Email:', email);
                res.status(404).send({ message: 'Usuario no encontrado' });
            }
        });
    } catch (error) {
        // Manejar cualquier error durante el procesamiento de la solicitud
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send({ message: 'Error en el servidor al procesar la solicitud' });
    }
});

// Función para obtener un usuario por email
async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}

// Puerto en el que escucha el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Node.js corriendo en http://localhost:${port}`);
});



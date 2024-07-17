const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const productosRoutes = require('./routes/productos'); // Ajusta la ruta si es necesario
const usuariosRoutes = require('./routes/usuarios'); // Ajusta la ruta si es necesario

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de mi aplicación');
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});

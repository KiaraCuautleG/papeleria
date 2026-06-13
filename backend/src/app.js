const express = require('express');
const cors = require('cors');
require('dotenv').config();
const categoriaRoutes = require("./routes/categoriaRoutes");
const productoRoutes = require("./routes/productoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const ventaRoutes = require("./routes/ventaRoutes");
const authRoutes = require(
  './routes/authRoutes'
);
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('📚 API de Papelería funcionando');
});

app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/ventas", ventaRoutes);
app.use(
  '/api/auth',
  authRoutes
);

module.exports = app;
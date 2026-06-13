const express = require('express');
const cors = require('cors');
require('dotenv').config();
const categoriaRoutes = require("./routes/categoriaRoutes");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('📚 API de Papelería funcionando');
});

app.use("/api/categorias", categoriaRoutes);

module.exports = app;
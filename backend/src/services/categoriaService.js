const pool = require("../config/database");

const getCategorias = async () => {
  const [rows] = await pool.query("SELECT * FROM categoria WHERE activo = 1");
  return rows;
};

const getCategoriaById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM categoria WHERE id = ?",
    [id]
  );
  return rows[0];
};

const createCategoria = async (categoria) => {
  const { nombre, descripcion } = categoria;

  const [result] = await pool.query(
    "INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)",
    [nombre, descripcion]
  );

  return result;
};

const updateCategoria = async (id, categoria) => {
  const { nombre, descripcion } = categoria;

  const [result] = await pool.query(
    `UPDATE categoria
     SET nombre = ?, descripcion = ?
     WHERE id = ?`,
    [nombre, descripcion, id]
  );

  return result;
};

const deleteCategoria = async (id) => {
  const [result] = await pool.query(
    "UPDATE categoria SET activo = 0 WHERE id = ?",
    [id]
  );

  return result;
};

module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};

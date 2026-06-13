const pool = require("../config/database");

const getProductos = async () => {
  const [rows] = await pool.query(`
    SELECT
      p.id,
      p.nombre,
      p.descripcion,
      p.precio,
      p.stock,
      p.imagen_url,
      p.categoria_id,
      c.nombre AS categoria_nombre
    FROM producto p
    INNER JOIN categoria c
      ON p.categoria_id = c.id
    WHERE p.activo = 1
      AND c.activo = 1
  `);

  return rows;
};

const getProductoById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      p.id,
      p.nombre,
      p.descripcion,
      p.precio,
      p.stock,
      p.imagen_url,
      p.categoria_id,
      c.nombre AS categoria_nombre
    FROM producto p
    INNER JOIN categoria c
      ON p.categoria_id = c.id
    WHERE p.id = ?
      AND p.activo = 1
      AND c.activo = 1
    `,
    [id]
  );

  return rows[0];
};

const createProducto = async (producto) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    categoria_id,
    imagen_url,
  } = producto;

  const [result] = await pool.query(
    `INSERT INTO producto
    (nombre, descripcion, precio, stock, categoria_id, imagen_url)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      imagen_url,
    ]
  );

  return result;
};

const updateProducto = async (id, producto) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    categoria_id,
    imagen_url,
  } = producto;

  const [result] = await pool.query(
    `UPDATE producto
     SET nombre = ?,
         descripcion = ?,
         precio = ?,
         stock = ?,
         categoria_id = ?,
         imagen_url = ?
     WHERE id = ?`,
    [
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      imagen_url,
      id,
    ]
  );

  return result;
};

const deleteProducto = async (id) => {
  const [result] = await pool.query(
    "UPDATE producto SET activo = 0 WHERE id = ?",
    [id]
  );

  return result;
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
const pool = require("../config/database");

const getUsuarios = async () => {
  const [rows] = await pool.query(
    `SELECT
      id,
      nombre,
      apellido,
      email,
      rol,
      created_at,
      activo
    FROM usuario
    WHERE activo = 1`
  );

  return rows;
};

const getUsuarioById = async (id) => {
  const [rows] = await pool.query(
    `SELECT
      id,
      nombre,
      apellido,
      email,
      rol,
      created_at,
      activo
    FROM usuario
    WHERE id = ? AND activo = 1`,
    [id]
  );

  return rows[0];
};

const createUsuario = async (usuario) => {
  const {
    nombre,
    apellido,
    email,
    password,
    rol,
  } = usuario;

  const [result] = await pool.query(
    `INSERT INTO usuario
    (nombre, apellido, email, password, rol)
    VALUES (?, ?, ?, ?, ?)`,
    [nombre, apellido, email, password, rol]
  );

  return result;
};

const updateUsuario = async (id, usuario) => {
  const {
    nombre,
    apellido,
    email,
    password,
    rol,
  } = usuario;

  const [result] = await pool.query(
    `UPDATE usuario
     SET nombre = ?,
         apellido = ?,
         email = ?,
         password = ?,
         rol = ?
     WHERE id = ?`,
    [nombre, apellido, email, password, rol, id]
  );

  return result;
};

const deleteUsuario = async (id) => {
  const [result] = await pool.query(
    "UPDATE usuario SET activo = 0 WHERE id = ?",
    [id]
  );

  return result;
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
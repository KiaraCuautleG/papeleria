const db = require('../config/database');

const login = async (email, password) => {

  const [rows] = await db.query(
    `SELECT id,
            nombre,
            apellido,
            email,
            rol
     FROM usuario
     WHERE email = ?
       AND password = ?
       AND activo = 1`,
    [email, password]
  );

  return rows[0];
};

module.exports = {
  login
};
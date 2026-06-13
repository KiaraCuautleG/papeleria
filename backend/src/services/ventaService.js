const pool = require("../config/database");

const getVentas = async () => {
  const [rows] = await pool.query(`
    SELECT
      v.id,
      v.fecha_venta,
      v.total,
      v.estado,
      u.id AS usuario_id,
      CONCAT(u.nombre, ' ', u.apellido) AS cliente
    FROM venta v
    INNER JOIN usuario u
      ON v.usuario_id = u.id
    WHERE u.activo = 1
    ORDER BY v.fecha_venta DESC
  `);

  return rows;
};

const getVentaById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      v.id,
      v.fecha_venta,
      v.total,
      v.estado,
      u.id AS usuario_id,
      CONCAT(u.nombre, ' ', u.apellido) AS cliente,
      dv.producto_id,
      p.nombre AS producto_nombre,
      dv.cantidad,
      dv.precio_unitario,
      dv.subtotal
    FROM venta v
    INNER JOIN usuario u
      ON v.usuario_id = u.id
    INNER JOIN detalle_venta dv
      ON v.id = dv.venta_id
    INNER JOIN producto p
      ON dv.producto_id = p.id
    WHERE v.id = ?
    `,
    [id]
  );

  if (rows.length === 0) {
    return null;
  }

  return {
    id: rows[0].id,
    fecha_venta: rows[0].fecha_venta,
    total: rows[0].total,
    estado: rows[0].estado,
    usuario_id: rows[0].usuario_id,
    cliente: rows[0].cliente,
    productos: rows.map((row) => ({
      producto_id: row.producto_id,
      producto_nombre: row.producto_nombre,
      cantidad: row.cantidad,
      precio_unitario: row.precio_unitario,
      subtotal: row.subtotal,
    })),
  };
};

const createVenta = async (venta) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { usuario_id, productos } = venta;

    let total = 0;
    const detalleVenta = [];

    for (const item of productos) {
      const [rows] = await connection.query(
        "SELECT precio, stock FROM producto WHERE id = ? AND activo = 1",
        [item.producto_id]
      );

      if (rows.length === 0) {
        throw new Error(
          `Producto ${item.producto_id} no encontrado`
        );
      }

      if (rows[0].stock < item.cantidad) {
        throw new Error(
          `Stock insuficiente para el producto ${item.producto_id}`
        );
      }

      const precio_unitario = rows[0].precio;
      const subtotal = precio_unitario * item.cantidad;

      total += subtotal;

      detalleVenta.push({
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario,
        subtotal,
      });
    }

    const [ventaResult] = await connection.query(
      "INSERT INTO venta (usuario_id, total, estado) VALUES (?, ?, ?)",
      [usuario_id, total, "PENDIENTE"]
    );

    const venta_id = ventaResult.insertId;

    for (const item of detalleVenta) {
      await connection.query(
        `INSERT INTO detalle_venta
        (venta_id, producto_id, cantidad, precio_unitario, subtotal)
        VALUES (?, ?, ?, ?, ?)`,
        [
          venta_id,
          item.producto_id,
          item.cantidad,
          item.precio_unitario,
          item.subtotal,
        ]
      );

      await connection.query(
        `UPDATE producto
         SET stock = stock - ?
         WHERE id = ?`,
        [item.cantidad, item.producto_id]
      );
    }

    await connection.commit();

    return {
      venta_id,
      total,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  getVentas,
  getVentaById,
  createVenta,
};
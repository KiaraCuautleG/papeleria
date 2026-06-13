const ventaService = require("../services/ventaService");

const getVentas = async (req, res) => {
  try {
    const ventas = await ventaService.getVentas();
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las ventas",
    });
  }
};

const getVentaById = async (req, res) => {
  try {
    const { id } = req.params;

    const venta = await ventaService.getVentaById(id);

    if (!venta) {
      return res.status(404).json({
        message: "Venta no encontrada",
      });
    }

    res.status(200).json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener la venta",
    });
  }
};

const createVenta = async (req, res) => {
  try {
    const result = await ventaService.createVenta(
      req.body
    );

    res.status(201).json({
      message: "Venta registrada correctamente",
      venta_id: result.venta_id,
      total: result.total,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getVentas,
  getVentaById,
  createVenta,
};
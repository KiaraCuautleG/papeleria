const productoService = require("../services/productoService");

const getProductos = async (req, res) => {
  try {
    const productos = await productoService.getProductos();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener los productos",
    });
  }
};

const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await productoService.getProductoById(id);

    if (!producto) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el producto",
    });
  }
};

const createProducto = async (req, res) => {
  try {
    const result = await productoService.createProducto(req.body);

    res.status(201).json({
      message: "Producto creado correctamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear el producto",
    });
  }
};

const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productoService.updateProducto(
      id,
      req.body
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el producto",
    });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productoService.deleteProducto(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar el producto",
    });
  }
};
module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
const categoriaService = require("../services/categoriaService");

const getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.getCategorias();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las categorías",
    });
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await categoriaService.getCategoriaById(id);

    if (!categoria) {
      return res.status(404).json({
        message: "Categoría no encontrada",
      });
    }

    res.status(200).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener la categoría",
    });
  }
};

const createCategoria = async (req, res) => {
  try {
    const result = await categoriaService.createCategoria(req.body);

    res.status(201).json({
      message: "Categoría creada correctamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la categoría",
    });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await categoriaService.updateCategoria(
      id,
      req.body
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Categoría no encontrada",
      });
    }

    res.status(200).json({
      message: "Categoría actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar la categoría",
    });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await categoriaService.deleteCategoria(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Categoría no encontrada",
      });
    }

    res.status(200).json({
      message: "Categoría eliminada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar la categoría",
    });
  }
};

module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
};
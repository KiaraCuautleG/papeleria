const usuarioService = require("../services/usuarioService");

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener los usuarios",
    });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await usuarioService.getUsuarioById(id);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener el usuario",
    });
  }
};

const createUsuario = async (req, res) => {
  try {
    const result = await usuarioService.createUsuario(req.body);

    res.status(201).json({
      message: "Usuario creado correctamente",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear el usuario",
    });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await usuarioService.updateUsuario(
      id,
      req.body
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el usuario",
    });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await usuarioService.deleteUsuario(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar el usuario",
    });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
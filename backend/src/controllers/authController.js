const authService = require('../services/authService');

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const usuario = await authService.login(
      email,
      password
    );

    if (!usuario) {
      return res.status(401).json({
        message: 'Credenciales inválidas'
      });
    }

    res.json(usuario);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error al iniciar sesión'
    });
  }

};

module.exports = {
  login
};
const userModel = require('../dao/models/users.model');

const registerForm = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) return res.status(400).send({ status: 400, error: 'Formato inválido.' });

    const exist = await userModel.findOne({ email });

    if (exist) return res.status(400).send({ status: 400, error: 'Ha ocurrido un error. Ya existe una cuenta registrado con el email ingresado.' });

    const result = await userModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.send({ status: 'success', payload: result });
  } catch (error) {
    return res.send({ status: 500, error: 'Ha ocurrido un error inesperado.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == 'adminCoder@coder.com' && password == 'adminCod3r123') {
      req.session.user = {
        id: 'adminCoder',
        firstName: 'Coder',
        lastName: 'Admin',
        email: email,
        role: 'admin',
      };
      return res.status(201).json({
        status: 'success',
        message: 'Has iniciado sesion satisfactoriamente',
        firstName: user.firstName,
        lastName: user.lastName
      });
    }

    if (!email || !password) return res.status(400).send({ status: 400, error: 'Formato inválido.' });

    const user = await userModel.findOne({ email, password });

    if (!user) return res.status(400).send({ status: 400, error: 'Ha ocurrido un error. El email o la contraseña son incorrectos.' });

    req.session.user = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: 'user',
    };

    return res.status(201).json({
      status: 'success',
      message: 'Has iniciado sesion satisfactoriamente',
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    res.send({ status: 500, error: 'Ha ocurrido un error inesperado al intentar iniciar sesión.' });
  }
}


module.exports = {
  registerForm,
  login,
};

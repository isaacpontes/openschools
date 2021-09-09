const JwtService = require("../../services/JwtService");

class AuthController {
  constructor (service) {
    this.service = service;
  }

  // Authenticates the user returning a JWT
  // POST /api/auth/login
  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await this.service.findByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'Email inválido ou não registrado.'});
      }

      user.checkPassword(password, (err, same) => {
        if (!same) {
          return res.status(401).json({ error: 'Email ou senha incorretos.'});
        }

        const payload = { email };

        const jwt = new JwtService({ payload });

        jwt.signIn('1d');

        return res.status(200).json({ authenticated: true, token: jwt.token });
      });
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro durante a autenticação.' });
    }
  }
}

module.exports = AuthController;

const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

module.exports = {
  // Authenticates the user returning a JWT
  // POST /api/auth/login
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'Email inválido ou não registrado.'});
      }

      user.checkPassword(password, (err, same) => {
        if (!same) {
          return res.status(401).json({ error: 'Email ou senha incorretos.'});
        }

        const payload = { email };

        const token = jwtService.signPayload(payload, '1d')

        return res.status(200).json({ authenticated: true, token });
      });
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro durante a autenticação.' });
    }
  }
}

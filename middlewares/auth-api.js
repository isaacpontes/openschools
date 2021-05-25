const User = require('../models/user');
const { verifyToken } = require('../services/jwt');

const ensureAuth = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token)
    return res.status(401).json({ message: 'Não Autorizado: nenhum token encontrado.'});

  const tokenEmail = verifyToken(token);

  if (!tokenEmail)
    return res.status(401).json({ message: 'Não Autorizado: token inválido.'});
  
  User.findOne({ email: tokenEmail })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(error => {
      return res.status(400).json({ message: 'Conteúdo do token inválido.'});
    })
};

module.exports = ensureAuth;

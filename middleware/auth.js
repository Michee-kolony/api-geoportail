const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
const authHeader = req.headers.authorization;

  // Vérifie si le header Authorization est présent
  if (!authHeader) {
    return res.status(401).json({ message: "Accès refusé : aucun token fourni." });
  }

  // Récupération du token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Accès refusé : token manquant." });
  }

  // Vérification du token avec promesse
  Promise.resolve(jwt.verify(token, 'RANDOM_SECRET_TOKEN'))
    .then(decodedToken => {
      req.auth = { userId: decodedToken.userId };
      next(); // Passe à la route suivante
    })
    .catch(error => {
      res.status(401).json({ message: "Accès non autorisé : authentification invalide.", error });
    });
};

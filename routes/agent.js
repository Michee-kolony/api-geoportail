// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/agent');

// ✅ Authentification
router.post('/register', (req, res) => {
  clientController.register(req, res);
});

router.post('/login', (req, res) => {
  clientController.login(req, res);
});

// ✅ Récupérer la localisation d’un client
router.get('/:clientId/location', (req, res) => {
  clientController.getLocation(req.params.clientId)
    .then(location => res.json({ location }))
    .catch(err => res.status(404).json({ message: err }));
});

// ✅ Mettre à jour la localisation (ex: pour test sans Socket.IO)
router.post('/update-location', (req, res) => {
  const { clientId, latitude, longitude } = req.body;
  clientController.updateLocation(clientId, latitude, longitude)
    .then(client => res.json({ message: 'Position mise à jour', client }))
    .catch(err => res.status(500).json({ message: err }));
});

module.exports = router;

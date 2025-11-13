const Client = require('../models/agent');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// === TOUS LES CLIENTS AVEC LEURS POSITIONS ===
exports.getAllClientsWithLocations = (req, res) => {
  Client.find({}, { name: 1, email: 1, location: 1 }) // on sélectionne seulement le nom, email et location
    .then(clients => res.json({ clients }))
    .catch(err => res.status(500).json({ message: 'Erreur serveur', error: err }));
};


// === INSCRIPTION ===
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  Client.findOne({ email })
    .then(existingClient => {
      if (existingClient) return Promise.reject('Email déjà utilisé');

      // Hachage du mot de passe ici
      return bcrypt.hash(password, 10)
        .then(hashedPassword => {
          const newClient = new Client({ name, email, password: hashedPassword });
          return newClient.save();
        });
    })
    .then(client => res.status(201).json({ message: 'Inscription réussie', client }))
    .catch(err => res.status(400).json({ message: err }));
};

// === CONNEXION ===
exports.login = (req, res) => {
  const { email, password } = req.body;

  Client.findOne({ email })
    .then(client => {
      if (!client) return Promise.reject('Client non trouvé');
      return bcrypt.compare(password, client.password)
        .then(isMatch => {
          if (!isMatch) return Promise.reject('Mot de passe incorrect');
          const token = jwt.sign({ id: client._id }, 'SECRET_KEY', { expiresIn: '7d' });
          res.json({ message: 'Connexion réussie', token, client });
        });
    })
    .catch(err => res.status(400).json({ message: err }));
};

// === LOCALISATION ===
exports.updateLocation = (clientId, latitude, longitude) => {
  return Client.findByIdAndUpdate(
    clientId,
    { location: { latitude, longitude, updatedAt: Date.now() } },
    { new: true }
  ).then(client => {
    if (!client) return Promise.reject('Client non trouvé');
    return client;
  });
};

exports.getLocation = (clientId) => {
  return Client.findById(clientId).then(client => {
    if (!client) return Promise.reject('Client non trouvé');
    return client.location;
  });
};

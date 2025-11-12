const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');

// Création du serveur HTTP à partir de l’app Express
const server = http.createServer(app);

// Initialisation de Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // à sécuriser plus tard
    methods: ["GET", "POST"]
  }
});

// Quand un client se connecte
io.on('connection', (socket) => {
  console.log('🟢 Nouveau client connecté :', socket.id);

  // Exemple : réception des coordonnées GPS envoyées par le client Angular
  socket.on('updatePosition', (data) => {
    console.log(`Position reçue du client ${data.clientId}:`, data);

    // Ici tu peux mettre à jour la position dans MongoDB
    // (appel du modèle Client si tu l’as configuré)
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client déconnecté');
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});

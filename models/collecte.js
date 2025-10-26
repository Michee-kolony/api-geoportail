const mongoose = require('mongoose');

// Fonction pour générer un matricule aléatoire unique
function generateRandomNumero() {
  return Math.floor(100000 + Math.random() * 900000); // Exemple : 6 chiffres aléatoires
}

const collecteSchema = new mongoose.Schema({
    numero: { type: Number, unique: true, default: generateRandomNumero },
    Nom : {type : String, required : true},
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
    Commune : {type:String, required : true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Collecte', collecteSchema);

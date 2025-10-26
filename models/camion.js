const mongoose = require('mongoose');

const camionSchema = mongoose.Schema({
  matricule: { type: String, unique: true },
  marque: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// 🎯 Génération automatique du matricule avant enregistrement
camionSchema.pre('save', function (next) {
  const Camion = mongoose.model('camions', camionSchema);

  // Si le matricule existe déjà (modification par ex.), on ne le régénère pas
  if (this.matricule) return next();

  // Récupération du dernier camion enregistré
  Camion.findOne().sort({ _id: -1 }).exec()
    .then(lastCamion => {
      let newNumber = 1;

      if (lastCamion && lastCamion.matricule) {
        // Ex: AKN0005 → extraire 0005 et incrémenter
        const lastNumber = parseInt(lastCamion.matricule.replace('AKN', ''), 10);
        newNumber = lastNumber + 1;
      }

      // Formater AKN + nombre à 4 chiffres
      this.matricule = `AKN${newNumber.toString().padStart(4, '0')}`;
      next();
    })
    .catch(error => next(error));
});

module.exports = mongoose.model('camions', camionSchema);

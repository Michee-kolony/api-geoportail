const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
          .then(hash=>{
            const admin = new Admin({
                pseudo : req.body.pseudo,
                email : req.body.email,
                password : hash
            })
            admin.save()
                 .then(()=>{res.status(200).json({message:"Inscription réussie"})})
                 .catch(error=>{res.status(401).json({message: "Erreur lors de l'inscription"})})
               
          })
          .catch(error=>{res.status(500).json({message : "Erreur du serveur"})})
}

exports.getadmin = (req, res, next)=>{
    Admin.find()
         .then(data=>{
            res.status(201).json({data})
        })
         .catch(
            error=>res.status(500).json({message : "Errreur serveur lors de la récupération des données"})
        )
}

exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  // Vérifie si les champs sont remplis
  if (!email || !password) {
    return res.status(400).json({ message: "Veuillez entrer un email et un mot de passe." });
  }

  // Recherche de l'admin par email
  Admin.findOne({ email })
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ message: "Admin introuvable" });
      }

      // Comparaison du mot de passe
      bcrypt.compare(password, admin.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
          }

          // Génération du token JWT
          const token = jwt.sign(
            { adminId: admin._id, email: admin.email },
            'RANDOM_SECRET_TOKEN', // à remplacer par une variable d’environnement
            { expiresIn: '24h' }
          );

          res.status(200).json({
            message: "Connexion réussie",
            token,
            admin: {
              userId: admin._id,
              pseudo: admin.pseudo,
              email: admin.email
            }
          });
        })
        .catch(error => res.status(500).json({ message: "Erreur serveur lors de la vérification du mot de passe ", error }));
    })
    .catch(error => res.status(500).json({ message: "Erreur serveur ", error }));
};
const Camion = require('../models/camion');

exports.ajout = (req, res, next)=>{
    const camion = new Camion({
        ...req.body
    })
    camion.save()
        .then(()=>res.status(200).json({message : "Camion ajouté"}))
        .catch(error=>res.status(500).json({message: "Erreur lors l'enregistrement"}))
}

exports.getcamion = (req, res, next)=>{
    Camion.find()
          .then(data=>res.status(201).json(data))
          .catch(error=>res.status(500).json({message : "Erreur lors de la récupération des données"}))
}

exports.deletecamion = (req, res, next)=>{
    Camion.deleteOne({_id:req.params.id})
          .then(()=>res.status(201).json({message: "Camion supprimé"}))
          .catch(error=>res.status(500).json({message : "Erreur lors de la suppression du camion"}))
}

exports.getonecamion = (req, res, next)=>{
     Camion.findOne({_id:req.params.id})
           .then(data=>res.status(200).json(data))
           .catch(error=>res.status(500).json({message : "Erreur lors de la récupération du camion"}))
}
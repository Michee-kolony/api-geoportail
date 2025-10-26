const Collecte = require ('../models/collecte');
exports.register = (req, res, next)=>{
    const collecte = new Collecte({
        ...req.body
    })
    collecte.save()
            .then(()=>res.status(200).json({message : "Point de collecte ajouté"}))
            .catch(error=>res.status(500).json({message : "erreur serveur lors de l'ajout de point de collecte"}))
}

exports.getall = (req, res, next)=>{
    Collecte.find()
            .then(data=>res.status(201).json(data))
            .catch(error=>{res.status(500).json({message : "Erreur lors de la récupération des collectes", error: error.message})})
}

exports.getone = (req, res, next)=>{
    Collecte.findOne({_id: req.params.id})
            .then(data=>res.status(201).json(data))
            .catch(error=>res.status(500).json({message : "Erreur lors de la récupération d'un point de collecte"}))
}

exports.deletec = (req, res, next)=>{
    Collecte.deleteOne({_id: req.params.id})
             .then(()=>res.status(200).json({message : "Point de collecte supprimé"}))
             .catch(error=>res.status(500).json({message : "Erreur lors de la supression du point de collecte"}))
}
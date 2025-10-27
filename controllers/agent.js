const Agent = require('../models/agent');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.register = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
          .then(hash=>{
            const agent = new Agent({
                nom : req.body.nom,
                sexe : req.body.sexe,
                email : req.body.email,
                password : hash
            })
            agent.save()
                 .then(()=>{res.status(200).json({message:"Inscription réussie"})})
                 .catch(error=>{res.status(401).json({message: "Erreur lors de l'inscription"})})
               
          })
          .catch(error=>{res.status(500).json({message : "Erreur du serveur"})})
}

exports.login = (req, res, next)=>{
    Agent.findOne({email:req.body.email})
        .then(user=>{
            if(user === null){
                res.status(404).json({message : "Paire de clés incorrecte"});
            }
            else{
                bcrypt.compare(req.body.password, user.password)
                       .then(valid =>{
                            if(!valid){
                            res.status(401).json({message : "Paire de clés incorrecte"});
                            }
                            else{
                                res.status(200).json({
                                    userId:user._id,
                                    Token : jwt.sign(
                                        {userId : user._id}, 
                                        'RANDOM_TOKEN_SECRET',
                                        {expiresIn : '24H'}
                                    ),
                                    nom:user.nom,
                                    email:user.email,
                                
                                });
                            }
                       })
                       .catch(err => res.status(400).json({error : "une erreur 400"}));
            }
        })
        .catch(error=>
            res.status(500).json({error: error})
        )
};


exports.getagent = (req, res, next)=>{
    Agent.find()
         .then(data=>res.status(200).json(data))
         .catch(error=>res.status(500).json({message : "erreur lors de la recupération des données"}))
}



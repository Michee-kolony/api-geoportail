const Mission = require('../models/missions');

exports.createMission = async (req, res)=>{
    const mission = new Mission({
        ...req.body
    })

    mission.save()
           .then(()=>res.status(201).json({message: "Mission crééé"}))
           .catch(error=>res.status(500).json({error}))
}

exports.getMission = async (req, res)=>{
    Mission.find()
           .then(data=>res.status(200).json(data))
           .catch(error=>res.status(500).json(error))
}

exports.deleteMission = async (req, res)=>{
    Mission.deleteOne({_id:req.params.id})
           .then(()=>res.status(201).json({message: "Mission supprimé"}))
           .catch(error=>res.status(500).json(error))
}
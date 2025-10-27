const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const agentshema = mongoose.Schema({
    nom : {type : String, required : true},
    sexe : {type: String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
})

agentshema.plugin(uniqueValidator);

module.exports = mongoose.model('Agents', agentshema);
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Adminroute = require('./routes/admin');
const Collecteroute = require('./routes/collecte');
const camionroute = require('./routes/camion');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://kolony:1708roosevelt@cluster0.6htgklq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.error('Connexion à MongoDB échouée !', err));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());


app.use('/auth', Adminroute);
app.use('/collectes', Collecteroute);
app.use('/camions', camionroute);



module.exports = app;

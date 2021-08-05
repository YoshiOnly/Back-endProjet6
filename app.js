const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const path = require('path');

const helmet = require('helmet');


const session = require('cookie-session');
const nocache = require('nocache');


// On importe mongoose pour pouvoir utiliser la base de données
const mongoose = require('mongoose'); // Plugin Mongoose pour se connecter à la data base Mongo Db


// Déclaration des routes
// On importe la route dédiée aux sauces
const saucesRoutes = require('./routes/sauces');
// On importe la route dédiée aux utilisateurs
const userRoutes = require('./routes/user');

// utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config();


// Connection à la base de données MongoDB avec la sécurité vers le fichier .env pour cacher le mot de passe
// L'un des avantages que nous avons à utiliser Mongoose pour gérer notre base de données MongoDB est que nous pouvons implémenter des schémas de données stricts
// qui permettent de rendre notre application plus robuste
mongoose.connect('mongodb+srv://Yoshi:AuBgBfsjFFU7NKM@piquant.jeur5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//app.use((req, res) => {
//    res.json({ message: 'Votre requête a bien été reçue !' }); 
// });

 // Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
    // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // on indique les méthodes autorisées pour les requêtes HTTP
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // on autorise ce serveur à fournir des scripts pour la page visitée
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
  });



  // Options pour sécuriser les cookies
  const expiryDate = new Date(Date.now() + 3600000); // 1 heure (60 * 60 * 1000)

app.use(session({
  name: 'session',
  secret: process.env.SEC_SES,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
    expires: expiryDate
  }
}));

 // Middleware qui permet de parser les requêtes envoyées par le client, on peut y accéder grâce à req.body
 app.use(bodyParser.urlencoded({
    extended: true
  }));

  
// Sécuriser Express en définissant divers en-têtes HTTP - https://www.npmjs.com/package/helmet#how-it-works
// On utilise helmet pour plusieurs raisons notamment la mise en place du X-XSS-Protection afin d'activer le filtre de script intersites(XSS) dans les navigateurs web
app.use(helmet());


//Désactive la mise en cache du navigateur
app.use(nocache());


  
// Gestion de la ressource image de façon statique
// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));


/**
 * ROUTES
 */
 app.use('/images', express.static(path.join(__dirname, 'images')));
 app.use('/api/sauces', saucesRoutes);
 app.use('/api/auth', userRoutes);
 
 module.exports = app;
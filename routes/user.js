
/**
 * Route User
 */

// Express
const express = require('express');
// Methode express
const router = express.Router();

//Controller
const userCtrl = require('../controllers/user');

//Middleware de vérification
const verifyPassword = require('../middleware/verifyPassword');

/**
 * Routes
 */

// Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base dedonnées /!\ Securité
router.post('/signup', verifyPassword, userCtrl.signup); // Crée un nouvel utilisateur

// Vérifie les informations d'identification de l'utilisateur, enrenvoyant l'identifiant userID depuis la base de données et un TokenWeb JSON signé(contenant également l'identifiant userID)
router.post('/login', userCtrl.login); // Connecte un utilisateur

module.exports = router;
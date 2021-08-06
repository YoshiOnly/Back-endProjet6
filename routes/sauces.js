/**
 * Route Sauce
 */

// Création du router qui contient les fonctions qui s'appliquent aux différentes routes pour les sauces
// Dans le routeur on ne veut QUE la logique de routing, ainsi la logique métier sera enregistrée dans le controller sauce.js

// Ajout de plugin externe nécessaire pour utiliser le router d'Express
const express = require('express');
// Appel du routeur avec la méthode mise à disposition par Express
const router = express.Router();

/**
 * Middleware
 */
// On importe le middleware auth pour sécuriser les routes
const auth = require('../middleware/auth'); // Récupère la configuration d'authentification JsonWebToken
//On importe le middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');

// On associe les fonctions aux différentes routes, on importe le controller
const saucesCtrl = require('../controllers/sauces');

/**
 * Routes
 */
// Création des différentes ROUTES de l'API ( chemin, autentification, multer(pour les images), controller)

// Route qui permet de créer "une sauce"
router.post('/', auth, multer, saucesCtrl.createSauce);

// Route qui permet de modifier "une sauce"
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

// Route qui permet de supprimer "une sauce"
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// Route qui permet d'avoir une sauce'
router.get('/:id', auth, saucesCtrl.getOneSauce);

// Route qui permet de récupérer toutes les sauces
router.get('/', auth, saucesCtrl.getAllSauce);

// Route qui permet de gérer les likes des sauces
router.post('/:id/like', auth, saucesCtrl.likeDislike)

module.exports = router;
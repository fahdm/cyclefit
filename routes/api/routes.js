const express = require('express');
const router = express.Router();
const routesCtrl = require('../../controllers/api/routes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/routes'
router.post('/', ensureLoggedIn, routesCtrl.create);
router.get('/', ensureLoggedIn, routesCtrl.index);

module.exports = router;

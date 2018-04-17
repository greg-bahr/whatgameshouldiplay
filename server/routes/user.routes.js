const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/id/:id', controller.findGamesBySteamID);
router.get('/user/:id', controller.findGamesByVanityURL);

module.exports = router;

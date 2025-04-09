// carRoutes.js - API maršrutai, kurie tvarko užklausas, susijusias su automobiliais/cars
const express = require('express');
const { getCars, getCarById } = require('../controllers/carController');
// Nurodom kad naudosim Express router'i kuris nukreips API requestus i atitinkama controller'i
const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);

module.exports = router;

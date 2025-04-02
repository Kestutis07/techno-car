// carRoutes.js - API marsrutai, kurie tvarko uzklausas, susijusias su automobiliais/cars
const express = require('express');
const { getCars } = require('../controllers/carController');
// Nurodome kad naudosime Express router'i kuris nukreips API requestus i atitinkama controller'i
const router = express.Router();

router.get('/', getCars);
// router.get('/:id', getCarId);

module.exports = router;

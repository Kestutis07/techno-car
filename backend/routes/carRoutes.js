// carRoutes.js - API maršrutai, kurie tvarko užklausas, susijusias su automobiliais/cars
const express = require('express');
const carsController = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');
// Nurodom kad naudosim Express router'i kuris nukreips API requestus i atitinkama controller'i
const router = express.Router();

router.get('/', carsController.getCars);
router.get('/:id', carsController.getCarById);

// Admin routes with authentication
router.post('/', authMiddleware, carsController.createCar);
router.put('/:id', authMiddleware, carsController.updateCar);

module.exports = router;

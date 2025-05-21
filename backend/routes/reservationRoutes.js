// ReservationRoutes.js yra failas, kuris aprašo maršrutus, susijusius su rezervacijomis.
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, reservationController.createReservation);
router.get('/', authMiddleware, reservationController.getUserReservations);
router.delete('/:id', authMiddleware, reservationController.deleteReservation);
// Admin route to get all reservations
router.get('/all', authMiddleware, reservationController.getAllReservations);

module.exports = router;

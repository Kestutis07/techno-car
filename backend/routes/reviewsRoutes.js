// carRoutes.js - API maršrutai, kurie tvarko užklausas, susijusias su automobiliais/cars
const express = require('express');
const {
  getReviews,
  createReview,
} = require('../controllers/reviewsController');
// Nurodom kad naudosim Express router'i kuris nukreips API requestus i atitinkama controller'i
const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);

module.exports = router;

// Controller - valdo logika kaip reaguoti i API uzkausas/requestus ir kreipiasi i Model jeigu atitinka business logika
const Car = require('../model/carModel');

const getCars = (req, res) => {
  res.json(Car.getAllCars());
};

const getCarById = (req, res) => {
  const carId = req.params.id;
  const car = Car.getCarById(carId);

  if (!car) {
    return res.status(404).json({ message: 'Car not found!' });
  }

  res.json(car);
};

module.exports = {
  getCars,
  getCarById,
};

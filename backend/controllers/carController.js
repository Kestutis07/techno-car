// Controller - valdo logikam kaip reaguoti i API uzklausas/requestus ir kreipiasi i Model jeigu atitinka business logika
const Car = require('../models/carModel');

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars' });
  }
};

exports.getCarById = async (req, res) => {
  const carId = req.params.id;
  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found!' });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch car' });
  }
};

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

// Create a new car (admin only)
exports.createCar = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized. Admin access required.' });
    }

    const newCar = new Car(req.body);
    await newCar.save();

    res.status(201).json({ message: 'Car created successfully', car: newCar });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create car', error: error.message });
  }
};

// Update car information (admin only)
exports.updateCar = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Not authorized. Admin access required.' });
    }

    const carId = req.params.id;
    const updates = req.body;

    const car = await Car.findByIdAndUpdate(carId, updates, { new: true });

    if (!car) {
      return res.status(404).json({ message: 'Car not found!' });
    }

    res.status(200).json({ message: 'Car updated successfully', car });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update car', error: error.message });
  }
};

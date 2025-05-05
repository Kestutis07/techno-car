const Car = require('../models/carModel');

// sukuriam rezervacija
exports.createReservation = async (req, res) => {
  try {
    const { carId, totalDays, startDate, endDate } = req.body;

    // 1. Patikrinam ar zmogus yra autentifikuotas
    const user = req.user._id;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 2. Patikrinam ar automobilis egzistuoja
    const car = Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
};

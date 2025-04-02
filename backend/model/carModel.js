// Model-atsakingas uz duomenu bazes operacijas
const fs = require('fs');
const filePath = './database/cars.json';

const getAllCars = () => {
  const data = fs.readFileSync(filePath);

  // JSON.parse - konvertuoja JSON string i Javascript Objekta
  return JSON.parse(data);
};

const getCarById = (id) => {
  const cars = getAllCars();
  return cars.find((car) => car.id === id);
};

module.exports = {
  getAllCars,
  getCarById,
};

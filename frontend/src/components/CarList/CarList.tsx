import { useState, useEffect } from 'react';
import './car-list.css';
import axios from 'axios';
import { CarCard } from '../CarCard/CarCard';
import { Car } from '../../types/types';

export const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Automobiliu Nuomos Platforma</h1>
        <p>Atraskite musu atrinktu automobiliu kolekcija</p>
      </div>
      <div className="section">
        <div className="section-title">
          <h2>Nuomos pasiulymai</h2>
          <p>Perziurekite musu automobiliu kolekcija</p>
        </div>
        <div className="car-list">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </>
  );
};

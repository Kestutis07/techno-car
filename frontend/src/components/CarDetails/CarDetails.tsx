import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Car } from '../../types/types';
import './car-details.css';

export const CarDetails = () => {
  const navigate = useNavigate();
  //  useParams yra HOOK kuris naudojamas gauti URL parametrus pvz id => :id
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);


 
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

  const handleBackClick: = () => {
    navigate('/');
  };

  return (
    <div className="car-detail">
      <div className="car-detail-container">
        {/* Kaire puse */}
        <div className="car-detail-left">
          <img src={car?.image} alt="Car" className="car-detail-image" />
        </div>
        {/* Desine puse */}
        <div className="car-detail-right">
          {/* header */}
          <div className="car-header">
            <h2>Audi a4</h2>
            <p className="car-year">2023 m.</p>
          </div>
          {/*  */}
          <div className="car-description">
            <p>Nuostabus automobilis!</p>
          </div>
          <div className="car-specs">
            <div className="spec-item">
              <span className="spec-label">Pavaru deze:</span>
              <span className="spec-value">Automatine</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kuro tipas:</span>
              <span className="spec-value">Benzinas</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Sedimu vietu:</span>
              <span className="spec-value">5</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kaina per diena:</span>
              <span className="spec-value">$50</span>
            </div>
            <div className="car-actons">
              <div className="spec-item">
                <button className="button button-primaty">Rezervuoti</button>
                <button className="button button-secondary">
                  Grizti i pagrindini
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

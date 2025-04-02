import { Car } from '../types/types';
import '.car-card.css';

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="car-card">
      <img src={car.image} alt="Car" className="car-card-image" />
      <div className="car-card-content">
        <h3>
          {car.make} {car.model}
        </h3>
        <p>{car.description}</p>
      </div>
    </div>
  );
};

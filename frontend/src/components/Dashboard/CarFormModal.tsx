import { useState, useEffect } from 'react';
import { Car } from '../../../types/types';
import './car-form-modal.css';

interface CarFormModalProps {
  onModalClose: () => void;
  // Omit<Car, "_id"> is used to exclude the _id field from the form data
  onSubmit: (formData: Omit<Car, '_id'>) => Promise<void>;
  editCar: Car | null;
}

export const CarFormModal: React.FC<CarFormModalProps> = ({
  onModalClose,
  onSubmit,
  editCar,
}) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState<string[]>([]);
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [seats, setSeats] = useState(0);
  const [year, setYear] = useState(0);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (editCar) {
      setMake(editCar.make);
      setModel(editCar.model);
      setDescription(editCar.description);
      setPrice(editCar.price);
      setFeatures(editCar.features);
      setTransmission(editCar.transmission);
      setFuelType(editCar.fuelType);
      setSeats(editCar.seats);
      setYear(editCar.year);
      setImage(editCar.image);
    }
  }, [editCar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      make,
      model,
      description,
      price,
      features,
      transmission,
      fuelType,
      seats,
      year,
      image,
    };
    await onSubmit(formData);
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const featuresString = e.target.value;
    setFeatures(featuresString.split(',').map((item) => item.trim()));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onModalClose}>
          &times;
        </span>
        <h2>{editCar ? 'Edit Car' : 'Add New Car'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Make:</label>
            <input
              value={make}
              onChange={(e) => setMake(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Model:</label>
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Price per day:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label>Features (comma-separated):</label>
            <input
              value={features.join(', ')}
              onChange={handleFeaturesChange}
            />
          </div>
          <div className="form-group">
            <label>Transmission:</label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div className="form-group">
            <label>Fuel Type:</label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="form-group">
            <label>Seats:</label>
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label>Year:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            {editCar ? 'Update Car' : 'Add Car'}
          </button>
        </form>
      </div>
    </div>
  );
};

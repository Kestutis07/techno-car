import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { AuthContext } from '../../context/AuthContext';
import { Car } from '../../types/types';
import { CarFormModal } from './CarFormModal';

export const AdminCarsTab = () => {
  const { access_token } = useContext(AuthContext);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editCar, setEditCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<Car[]>(`${API_URL}/cars`);
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSubmit = async (formData: Omit<Car, '_id'>) => {
    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };

    try {
      if (editCar) {
        await axios.put(`${API_URL}/cars/${editCar._id}`, formData, config);
        alert('Car updated successfully!');
      } else {
        await axios.post(`${API_URL}/cars`, formData, config);
        alert('Car created successfully!');
      }

      // Refresh car list
      const response = await axios.get<Car[]>(`${API_URL}/cars`);
      setCars(response.data);

      // Reset form
      setShowForm(false);
      setEditCar(null);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (car: Car) => {
    setEditCar(car);
    setShowForm(true);
  };

  return (
    <div className="admin-tab">
      <div className="admin-header">
        <h2>Car Management</h2>
        <button className="btn" onClick={() => setShowForm(true)}>
          Add New Car
        </button>
      </div>

      {loading ? (
        <p>Loading cars...</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>
                  <img src={car.image} alt={car.make} className="car-image" />
                </td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>${car.price}/day</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(car)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <CarFormModal
          onModalClose={() => {
            setShowForm(false);
            setEditCar(null);
          }}
          onSubmit={handleSubmit}
          editCar={editCar}
        />
      )}
    </div>
  );
};

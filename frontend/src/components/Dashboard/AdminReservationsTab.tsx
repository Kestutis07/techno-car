import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { AuthContext } from '../../context/AuthContext';
import { AdminReservation } from '../../types/types';

export const AdminReservationsTab = () => {
  const { access_token } = useContext(AuthContext);
  const [allReservations, setAllReservations] = useState<AdminReservation[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${access_token}` },
        };

        const response = await axios.get<AdminReservation[]>(
          `${API_URL}/reservations/all`,
          config
        );
        setAllReservations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching all reservations:', error);
        setLoading(false);
      }
    };

    fetchAllReservations();
  }, [access_token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="admin-tab">
      <h2>All Reservations</h2>

      {loading ? (
        <p>Loading reservations...</p>
      ) : allReservations.length === 0 ? (
        <p>No reservations found</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {allReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>
                  {reservation.user.name}
                  <div className="email">{reservation.user.email}</div>
                </td>
                <td>
                  <div className="car-details">
                    <img
                      src={reservation.car.image}
                      alt={reservation.car.make}
                      className="car-image"
                    />
                    <div>
                      {reservation.car.make} {reservation.car.model}
                    </div>
                  </div>
                </td>
                <td>{formatDate(reservation.startDate)}</td>
                <td>{formatDate(reservation.endDate)}</td>
                <td>${reservation.totalPrice}</td>
                <td>{formatDate(reservation.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

import { useContext, useEffect, useState } from 'react';
import './dashboard.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { Reservation } from '../../types/types';
import { AccountInfo } from './components/AccountInfo';
import { ReservationList } from './components/ReservationList';

export const Dashboard = () => {
  const { user, access_token } = useContext(AuthContext);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.get<Reservation[]>(
        `${API_URL}/reservations`,
        config
      );
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchReservations();
    }
  }, [access_token]);

  // Handle reservation deletion
  const handleDelete = async (reservationId: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;

    try {
      setDeleteLoading(reservationId);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      await axios.delete(`${API_URL}/reservations/${reservationId}`, config);

      // Update the reservations list
      setReservations((prev) =>
        prev.filter((res) => res._id !== reservationId)
      );
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Failed to delete reservation. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="welcome-text">Welcome back, {user?.name}!</p>
      </div>

      <div className="dashboard-content">
        <AccountInfo user={user} />
        <ReservationList
          reservations={reservations}
          loading={loading}
          deleteLoading={deleteLoading}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

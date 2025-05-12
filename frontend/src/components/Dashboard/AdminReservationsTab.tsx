export const AdminReservationsTab = () => {
  import { User } from '../../types/types';
  return (
    <div className="admin-tab">
      <h2>All Reservations</h2>

      <table className="reservation-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Car</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Price</th>
            <th>Total Price</th>
            <th>Booking Date</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

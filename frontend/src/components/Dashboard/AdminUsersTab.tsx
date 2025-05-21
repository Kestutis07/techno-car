import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../types/types';
import { UserUpdateModal } from './UserUpdateModal';

export const AdminUsersTab = () => {
  const { access_token } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchAllUsers = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      const response = await axios.get<User[]>(
        `${API_URL}/auth/all-users`,
        config
      );
      setAllUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all users:', error);
      setLoading(false);
    }
  };

  const updateUserRole = async (newRole: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
      };

      await axios.put(
        `${API_URL}/auth/update-role/${selectedUser?._id}`,
        { role: newRole },
        config
      );
      setIsModalOpen(false);
      setSelectedUser(null);
      fetchAllUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchAllUsers();
  }, [access_token]);

  return (
    <div className="admin-tab">
      <h2>All Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : allUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <UserUpdateModal
          onModalClose={() => setIsModalOpen(false)}
          onSubmit={(formData) => updateUserRole(formData.role)}
          editUser={selectedUser}
        />
      )}
    </div>
  );
};

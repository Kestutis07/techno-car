import { useState, useEffect } from 'react';
import { User } from '../../../types/types';
import './car-form-modal.css';

interface UserUpdateModalProps {
  onModalClose: () => void;
  onSubmit: (formData: { role: string }) => Promise<void>;
  editUser: User | null;
}

export const UserUpdateModal: React.FC<UserUpdateModalProps> = ({
  editUser,
  onModalClose,
  onSubmit,
}) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    if (editUser) {
      setRole(editUser.role);
    }
  }, [editUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      role,
    };

    await onSubmit(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onModalClose}>
          &times;
        </span>
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

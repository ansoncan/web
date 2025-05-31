import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { baseURL } from '../common/http-common';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const ChangePW: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication token is missing');
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    if (formData.newPassword.length > 30) {
      alert('Password must be no more than 30 characters long');
      return;
    }

    try {
      const response = await fetch(`${baseURL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          k: token,
        },
        body: JSON.stringify({
          newPassword: formData.newPassword,
        }),
      });

      if (response.ok) {
        alert('Password changed successfully');
        logout();
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`Failed to change password: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('An error occurred while changing the password');
    }
  };

  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);

  return (
    <div className="container mt-5">
      <h2>Change Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNewPassword" className="mb-3">
          <Form.Label>New Password:</Form.Label>
          <div style={{ position: 'relative', width: '400px' }}>
            <Form.Control
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password (max 30 characters)"
              required
            />
            <span
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={toggleShowNewPassword}
            >
              {showNewPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
        </Form.Group>

        <Form.Group controlId="formConfirmNewPassword" className="mb-3">
          <Form.Label>Confirm New Password:</Form.Label>
          <div style={{ position: 'relative', width: '400px' }}>
            <Form.Control
              type={showNewPassword ? 'text' : 'password'}
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
            />
            <span
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={toggleShowNewPassword}
            >
              {showNewPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </Form>
    </div>
  );
};

export default ChangePW;

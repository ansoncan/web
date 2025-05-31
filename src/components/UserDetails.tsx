import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { baseURL } from '../common/http-common';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface UserDetailsProps {
  onLogout: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ onLogout }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    lastname: '',
    firstname: '',
    type: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const authKey = localStorage.getItem('authKey');

  useEffect(() => {
    if (authKey) {
      fetchUserDetails();
    } else {
      setError('Authentication key not found. Please log in again.');
      navigate('/');
    }
  }, [authKey]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${baseURL}/user/detail`, {
        method: 'GET',
        headers: {
          k: authKey!,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        setError('Failed to fetch user details');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const toggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
    setNewPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setError('');
    setSuccessMessage('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length > 30) {
      setError('Password must be less than or equal to 30 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${baseURL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          k: authKey!,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        setSuccessMessage('Password updated successfully. Logging out...');
        setTimeout(() => {
          localStorage.removeItem('authKey');
          onLogout();
          navigate('/');
        }, 2000);
      } else {
        setError('Failed to update password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="ms-4 mt-4">
      <h2>{isChangingPassword ? 'Change Password' : userDetails.type === '1' ? 'Staff Detail' : 'Customer Detail'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {!isChangingPassword ? (
        <>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={userDetails.username} readOnly style={{ width: '250px' }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={userDetails.lastname} readOnly style={{ width: '250px' }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={userDetails.firstname} readOnly style={{ width: '250px' }} />
            </Form.Group>
          </Form>
          <Button variant="secondary" onClick={toggleChangePassword} className="mt-3">
            Change Password
          </Button>
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <InputGroup style={{ width: '250px' }}>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Max 30 characters"
              />
              <InputGroup.Text>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toggleShowPassword} style={{ cursor: 'pointer' }} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <InputGroup style={{ width: '250px' }}>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <InputGroup.Text>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={toggleShowPassword} style={{ cursor: 'pointer' }} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <div className="d-flex align-items-center">
            <Button variant="primary" type="submit" className="me-3">
              Save
            </Button>
            <Button variant="secondary" onClick={toggleChangePassword}>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default UserDetails;

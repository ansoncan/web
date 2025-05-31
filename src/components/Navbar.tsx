import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

interface Props {
  onMonthChange: (month: string) => void;
  onClearFilter: () => void;
}

const Navbar: React.FC<Props> = ({ onMonthChange, onClearFilter }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMonthTemp, setSelectedMonthTemp] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authKey = localStorage.getItem('authKey');
    setIsLoggedIn(!!authKey);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authKey');
    setIsLoggedIn(false);
    setSelectedMonthTemp(null);
    onClearFilter();
    setSearchQuery('');
    navigate('/');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const applyFilter = () => {
    if (selectedMonthTemp) {
      onMonthChange(selectedMonthTemp); // Notify parent of selected month
      navigate('/filtered');
    } else {
      alert('Please select a month before applying the filter.');
    }
  };

  const clearFilter = () => {
    setSelectedMonthTemp(null);
    onClearFilter();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a href="/" className="navbar-brand ms-3">FilmStores</a>

        <Form onSubmit={handleSearch} className="d-flex me-auto">
          <Form.Control
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="me-2"
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>

        {!isLoggedIn && (
          <>
            <Dropdown onSelect={(eventKey) => eventKey && setSelectedMonthTemp(eventKey)} className="me-2">
              <Dropdown.Toggle variant="success">
                {selectedMonthTemp || 'Select a Month'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ].map((month) => (
                  <Dropdown.Item key={month} eventKey={month}>
                    {month}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={applyFilter}>Apply Filter</Button>
            <Button variant="secondary" className="ms-2 me-5" onClick={clearFilter}>Clear Filter</Button>
          </>
        )}

        {isLoggedIn ? (
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

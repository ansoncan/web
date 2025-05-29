import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

interface Props {
  onMonthChange: (month: string) => void; // Callback to permanently update the filter
  onClearFilter: () => void; // Callback to clear the filter
}

const Navbar: React.FC<Props> = ({ onMonthChange, onClearFilter }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMonthTemp, setSelectedMonthTemp] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleMonthChange = (eventKey: string | null) => {
    if (eventKey) {
      console.log('Selected Month in Navbar (temp):', eventKey);
      setSelectedMonthTemp(eventKey);
    }
  };

  const applyFilter = () => {
    if (selectedMonthTemp) {
      console.log('Applying filter with selected month:', selectedMonthTemp);
      onMonthChange(selectedMonthTemp);
      navigate('/filtered');
    } else {
      alert('Please select a month before applying the filter.');
    }
  };

  const clearFilter = () => {
    console.log('Clearing filter');
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
        <div className="d-flex align-items-center">
          <a href="/" className="navbar-brand ms-3">
            FilmStores
          </a>
        </div>
        <Form onSubmit={handleSearch} className="d-flex me-auto">
          <Form.Control
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="me-2"
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
        <Dropdown onSelect={handleMonthChange} className="me-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedMonthTemp || 'Select a Month'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ].map((month) => (
              <Dropdown.Item key={month} eventKey={month}>
                {month}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" onClick={applyFilter}>
          Apply Filter
        </Button>
        <Button variant="secondary" className="ms-2 me-5" onClick={clearFilter}>
          Clear Filter
        </Button>
        <div className="d-flex align-items-center">
          <ul className="navbar-nav me-4">
            <li className="nav-item">
              <Button>Login</Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


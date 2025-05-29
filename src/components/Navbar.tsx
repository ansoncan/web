import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

interface Props {
  setSelectedMonth: (month: string) => void;
  clearFilter: () => void;
}

const Navbar: React.FC<Props> = ({ setSelectedMonth, clearFilter }) => {
  const [selectedMonth, setLocalSelectedMonth] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleMonthChange = (eventKey: any) => {
    setLocalSelectedMonth(eventKey);
  };

  const applyFilter = () => {
    setSelectedMonth(selectedMonth);
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
          {/* FilmStores */}
          <a href="/" className="navbar-brand ms-3">FilmStores</a>
        </div>

        {/* Search Form */}
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

        {/* Month Filter Dropdown */}
        <Dropdown onSelect={handleMonthChange} className="me-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedMonth || 'Select a Month'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="January">January</Dropdown.Item>
            <Dropdown.Item eventKey="February">February</Dropdown.Item>
            <Dropdown.Item eventKey="March">March</Dropdown.Item>
            <Dropdown.Item eventKey="April">April</Dropdown.Item>
            <Dropdown.Item eventKey="May">May</Dropdown.Item>
            <Dropdown.Item eventKey="June">June</Dropdown.Item>
            <Dropdown.Item eventKey="July">July</Dropdown.Item>
            <Dropdown.Item eventKey="August">August</Dropdown.Item>
            <Dropdown.Item eventKey="September">September</Dropdown.Item>
            <Dropdown.Item eventKey="October">October</Dropdown.Item>
            <Dropdown.Item eventKey="November">November</Dropdown.Item>
            <Dropdown.Item eventKey="December">December</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Apply and Clear Filter Buttons */}
        <Button variant="primary" onClick={applyFilter} disabled={!selectedMonth}>
          Apply Filter
        </Button>
        <Button variant="secondary" className="ms-2 me-5" onClick={clearFilter}>
          Clear Filter
        </Button>

        {/* Login Button */}
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
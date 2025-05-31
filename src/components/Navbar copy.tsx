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

///////
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { baseURL } from "../common/http-common";

interface Props {
  onMonthChange: (month: string) => void;
  onClearFilter: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Navbar: React.FC<Props> = ({
  onMonthChange,
  onClearFilter,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMonthTemp, setSelectedMonthTemp] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const key = localStorage.getItem("authKey");
    if (key) {
      fetchUserDetails(key);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // const fetchUserDetails = async (key: string) => {
  //   try {
  //     const response = await fetch(`${baseURL}/user/detail`, {
  //       method: "GET",
  //       headers: {
  //         k: key,
  //       },
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setIsLoggedIn(true);
  //       localStorage.setItem("userType", data.type);

  //       if (data.type === "1") {
  //         navigate("/add-film");
  //       } else {
  //         navigate("/");
  //       }
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   } catch (error) {
  //     setIsLoggedIn(false);
  //   }
  // };
const fetchUserDetails = async (key: string) => {
  try {
    const response = await fetch(`${baseURL}/user/detail`, {
      method: "GET",
      headers: {
        k: key,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setIsLoggedIn(true);
      localStorage.setItem("userType", data.type);

      // ✅ No redirect needed
    } else {
      setIsLoggedIn(false);
    }
  } catch (error) {
    setIsLoggedIn(false);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("authKey");
    setIsLoggedIn(false);
    setSelectedMonthTemp(null);
    onClearFilter();
    setSearchQuery("");
    navigate("/");
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const applyFilter = () => {
    if (selectedMonthTemp) {
      onMonthChange(selectedMonthTemp);
      navigate("/filtered");
    } else {
      alert("Please select a month before applying the filter.");
    }
  };

  const clearFilter = () => {
    setSelectedMonthTemp(null);
    onClearFilter();
    navigate("/");
  };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     navigate(`/search/${encodeURIComponent(searchQuery)}`);
  //   }
  // };

  const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();

  const trimmedQuery = searchQuery.trim();
  if (!trimmedQuery) return;

  const authKey = localStorage.getItem('authKey');

  if (authKey) {
    try {
      const response = await fetch(`${baseURL}/user/detail`, {
        method: 'GET',
        headers: {
          k: authKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.type === '1') {
          // Staff user: redirect to AddFilm
          console.log("User Data:", data.type);
          navigate('/add-film');
          return;
        }
      }
    } catch (error) {
      console.error('Error checking user type:', error);
    }

    console.log("Auth Key:", authKey);
    console.log("Search Query:", trimmedQuery);


  }

  // Default behavior: perform search
  navigate(`/search/${encodeURIComponent(trimmedQuery)}`);
};


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a href="/" className="navbar-brand ms-3">
          FilmStores
        </a>
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

        <Dropdown
          onSelect={(eventKey) => eventKey && setSelectedMonthTemp(eventKey)}
          className="me-2"
        >
          <Dropdown.Toggle variant="success">
            {selectedMonthTemp || "Select a Month"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
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

        {isLoggedIn ? (
          <>
            <Button
              variant="warning"
              onClick={() => navigate("/user-details")}
              className="me-2"
            >
              Account
            </Button>
            <Button variant="danger" onClick={handleLogout} className="me-2">
              Logout
            </Button>
          </>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

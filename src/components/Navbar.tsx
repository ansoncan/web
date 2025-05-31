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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    const authKey = localStorage.getItem("authKey");

    if (authKey) {
      try {
        const response = await fetch(`${baseURL}/user/detail`, {
          method: "GET",
          headers: {
            k: authKey,
          },
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("userType", data.type); // Store user type
        }
      } catch (error) {
        console.error("Error checking user type:", error);
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

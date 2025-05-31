import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Footer from './components/Footer';
import Detail from './components/Detail';
import Search from './components/Search';
import FilteredCard from './components/FilteredCard';
import UserDetails from './components/UserDetails';
import AddFilm from './components/AddFilm'; // New component
import ChangePW from './components/ChangePW'; // Import the ChangePW component
import Spinner from 'react-bootstrap/Spinner';
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authKey = localStorage.getItem('authKey');
    setIsLoggedIn(!!authKey);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Router>
      <AuthProvider> {/* Wrap the entire application in AuthProvider */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="grow" variant="light" />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar
              onMonthChange={(month) => setSelectedMonth(month)}
              onClearFilter={() => setSelectedMonth(null)}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
            <div style={{ flex: 1, marginTop: '35px' }}>
              <div className="container-fluid">
                <Routes>
                  <Route path="/" element={<Card />} />
                  <Route path="/detail/:id" element={<Detail />} />
                  <Route path="/search/:title" element={<Search />} />
                  <Route path="/filtered" element={<FilteredCard selectedMonth={selectedMonth} />} />
                  <Route path="/user-details" element={<UserDetails onLogout={() => setIsLoggedIn(false)} />} />
                  <Route path="/add-film" element={<AddFilm />} /> {/* New route for AddFilm */}
                  <Route path="/change-password" element={<ChangePW />} /> {/* New route for ChangePW */}
                </Routes>
              </div>
            </div>
            <Footer />
          </div>
        )}
      </AuthProvider> {/* Close AuthProvider */}
    </Router>
  );
}

export default App;
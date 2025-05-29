// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Footer from './components/Footer';
import Detail from './components/Detail'; // Import Detail component
import Search from './components/Search';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an initial loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed
  }, []);

  return (
    <Router>
      {loading ? (
        <div className="text-center mt-5">Loading...</div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', // Ensure the container takes full viewport height
          }}
        >
          {/* Navbar */}
          <Navbar />

          {/* Main content area */}
          <div
            style={{
              flex: 1, // This will push the footer to the bottom
              marginTop: '35px',
            }}
          >
            <div className="container-fluid">
              <Routes>
                <Route path="/" element={<Card />} />
                <Route path="/detail/:id" element={<Detail />} /> {/* Add route for detail page */}
                <Route path="/search/:title" element={<Search />} /> {/* Route for Search */}
              </Routes>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
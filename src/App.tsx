// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Card from './components/Card';
// import Footer from './components/Footer';
// import Detail from './components/Detail'; // Detail page component
// import Search from './components/Search';
// import FilteredCard from './components/FilteredCard';
// import UserDetails from './components/UserDetails'; // New UserDetails component
// import { useState, useEffect } from 'react';

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);

//   console.log('Selected Month in App:', selectedMonth);

//   return (
//     <Router>
//       {loading ? (
//         <div className="text-center mt-5">Loading...</div>
//       ) : (
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             minHeight: '100vh',
//           }}
//         >
//           <Navbar
//             onMonthChange={(month) => setSelectedMonth(month)}
//             onClearFilter={() => setSelectedMonth(null)}
//           />
//           <div
//             style={{
//               flex: 1,
//               marginTop: '35px',
//             }}
//           >
//             <div className="container-fluid">
//               <Routes>
//                 <Route path="/" element={<Card />} />
//                 <Route path="/detail/:id" element={<Detail />} />
//                 <Route path="/search/:title" element={<Search />} />
//                 <Route
//                   path="/filtered"
//                   element={<FilteredCard selectedMonth={selectedMonth} />}
//                 />
//                 <Route path="/user-details" element={<UserDetails />} /> {/* New route for UserDetails */}
//               </Routes>
//             </div>
//           </div>
//           <Footer />
//         </div>
//       )}
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Footer from './components/Footer';
import Detail from './components/Detail';
import Search from './components/Search';
import FilteredCard from './components/FilteredCard';
import UserDetails from './components/UserDetails';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

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

  const handleLogout = () => {
    localStorage.removeItem('authKey');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {loading ? (
        // <div className="text-center mt-5">Loading...</div>
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
                <Route path="/user-details" element={<UserDetails onLogout={handleLogout} />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Card from './components/Card';
// import Footer from './components/Footer';
// import Detail from './components/Detail'; // Detail page component
// import Search from './components/Search';
// import FilteredCard from './components/FilteredCard';
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
import Detail from './components/Detail'; // Detail page component
import Search from './components/Search';
import FilteredCard from './components/FilteredCard';
import UserDetails from './components/UserDetails'; // New UserDetails component
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  console.log('Selected Month in App:', selectedMonth);

  return (
    <Router>
      {loading ? (
        <div className="text-center mt-5">Loading...</div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Navbar
            onMonthChange={(month) => setSelectedMonth(month)}
            onClearFilter={() => setSelectedMonth(null)}
          />
          <div
            style={{
              flex: 1,
              marginTop: '35px',
            }}
          >
            <div className="container-fluid">
              <Routes>
                <Route path="/" element={<Card />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/search/:title" element={<Search />} />
                <Route
                  path="/filtered"
                  element={<FilteredCard selectedMonth={selectedMonth} />}
                />
                <Route path="/user-details" element={<UserDetails />} /> {/* New route for UserDetails */}
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
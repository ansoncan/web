// // src/components/Detail.tsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom'; // Import useParams and Link
// import { baseURL } from '../common/http-common';
// import defaultImage from '../assets/poster_not_found.png'; // Default image path
// import { Container, Row, Col, Card, CardImg } from 'react-bootstrap';
// import Spinner from 'react-bootstrap/Spinner';

// // Define a type for the detailed film object
// type DetailedFilm = {
//   _id: string;
//   title: string;
//   year: string;
//   released: string;
//   runtime: number;
//   language: string;
//   genre: string;
//   director: string;
//   poster: string | null;
// };

// const Detail: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Extract the id parameter from the URL
//   const [film, setFilm] = useState<DetailedFilm | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchFilmDetails = async () => {
//       try {
//         console.log(`Fetching film details for id: ${id}`); // Debug log
//         const response = await fetch(`${baseURL}/film/${id}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data: DetailedFilm[] = await response.json(); // API returns an array
//         if (data.length === 0) {
//           throw new Error('No film found');
//         }
//         setFilm(data[0]); // Extract the first (and only) film from the array
//         console.log('Film data fetched:', data[0]); // Debug log
//       } catch (error: any) {
//         setError(error.message);
//         console.error('Error fetching film details:', error.message); // Debug log
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchFilmDetails();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   if (error) {
//     return <div style={{ display: 'none' }}>Error: {error}</div>;
//   }

//   if (!film) {
//     return <div style={{ display: 'none' }}>Film not found.</div>;
//   }

//   // Handle the poster logic
//   const posterSrc = film.poster ? film.poster : defaultImage;

//   return (
//     <Container
//       fluid
//       style={{
//         maxWidth: '100%', // Ensure the container spans the full width
//         paddingLeft: 0, // Remove default padding
//         paddingRight: 0, // Remove default padding
//       }}
//     >
//       <Row className="g-0">
//         <Col md={3} style={{ position: 'relative' }}>
//           <Card style={{ width: '100%', height: '100%' }}>
//             <CardImg
//               variant="top"
//               src={posterSrc}
//               alt={film.title}
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//               onError={(e) => {
//                 // If the image fails to load, set the src to defaultImage
//                 (e.target as HTMLImageElement).src = defaultImage;
//               }}
//             />
//           </Card>
//         </Col>
//         <Col md={5}>
//           <Card style={{ width: '100%', height: '100%' }}>
//             <Card.Body className="d-flex flex-column"> {/* Use flex-column to stack content */}
//               <Row>
//                 <Col xs={3} className="text-start">
//                   <strong>Title:</strong>
//                 </Col>
//                 <Col xs={9}>
//                   {film.title}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={3} className="text-start">
//                   <strong>Year:</strong>
//                 </Col>
//                 <Col xs={9}>
//                   {film.year}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={3} className="text-start">
//                   <strong>Released:</strong>
//                 </Col>
//                 <Col xs={9}>
//                   {film.released}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={3} className="text-start">
//                   <strong>Runtime:</strong>
//                 </Col>
//                 <Col xs={9}>
//                   {film.runtime} minutes
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={3} className="text-start">
//                   <strong>Language:</strong>
//                 </Col>
//                 <Col xs={9}>
//                   {film.language}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={3} className="text-start">
//                   <strong>Genre:</strong>
//                 </Col>
//                 <Col xs={9}>
//                   {film.genre}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={3} className="text-start">
//                   <strong>Director:</strong>
//                 </Col>
//                 <Col xs={9}>
//                   {film.director}
//                 </Col>
//               </Row>
//               {/* Add the "Go back" button at the bottom */}
//               <div className="mt-auto text-start"> {/* Use mt-auto to push the button to the bottom */}
//                 <Link to="/" className="btn btn-primary">
//                   Go back
//                 </Link>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Detail;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { baseURL } from '../common/http-common';
import defaultImage from '../assets/poster_not_found.png'; // Default image path
import { Container, Row, Col, Card, CardImg } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation } from 'react-router-dom';


// Define a type for the detailed film object
type DetailedFilm = {
  _id: string;
  title: string;
  year: string;
  released: string;
  runtime: number;
  language: string;
  genre: string;
  director: string;
  poster: string | null;
};

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the id parameter from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [film, setFilm] = useState<DetailedFilm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const fromPage = location.state?.page || 1;


  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        console.log(`Fetching film details for id: ${id}`); // Debug log
        const response = await fetch(`${baseURL}/film/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: DetailedFilm[] = await response.json(); // API returns an array
        if (data.length === 0) {
          throw new Error('No film found');
        }
        setFilm(data[0]); // Extract the first (and only) film from the array
        console.log('Film data fetched:', data[0]); // Debug log
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching film details:', error.message); // Debug log
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFilmDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!film) {
    return <div>Film not found.</div>;
  }

  // Handle the poster logic
  const posterSrc = film.poster ? film.poster : defaultImage;

  return (
    <Container
      fluid
      style={{
        maxWidth: '100%', // Ensure the container spans the full width
        paddingLeft: 0, // Remove default padding
        paddingRight: 0, // Remove default padding
      }}
    >
      <Row className="g-0">
        <Col md={3} style={{ position: 'relative' }}>
          <Card style={{ width: '100%', height: '100%' }}>
            <CardImg
              variant="top"
              src={posterSrc}
              alt={film.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                // If the image fails to load, set the src to defaultImage
                (e.target as HTMLImageElement).src = defaultImage;
              }}
            />
          </Card>
        </Col>
        <Col md={5}>
          <Card style={{ width: '100%', height: '100%' }}>
            <Card.Body className="d-flex flex-column"> {/* Use flex-column to stack content */}
              <Row>
                <Col xs={3} className="text-start">
                  <strong>Title:</strong>
                </Col>
                <Col xs={9}>
                  {film.title}
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="text-start">
                  <strong>Year:</strong>
                </Col>
                <Col xs={9}>
                  {film.year}
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="text-start">
                  <strong>Released:</strong>
                </Col>
                <Col xs={9}>
                  {film.released}
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="text-start">
                  <strong>Runtime:</strong>
                </Col>
                <Col xs={9}>
                  {film.runtime} minutes
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="text-start">
                  <strong>Language:</strong>
                </Col>
                <Col xs={9}>
                  {film.language}
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="text-start">
                  <strong>Genre:</strong>
                </Col>
                <Col xs={9}>
                  {film.genre}
                </Col>
              </Row>
              <Row>
                <Col xs={3} className="text-start">
                  <strong>Director:</strong>
                </Col>
                <Col xs={9}>
                  {film.director}
                </Col>
              </Row>
              {/* Add the "Go back" button at the bottom */}
              <div className="mt-auto text-start"> {/* Use mt-auto to push the button to the bottom */}
                
<button className="btn btn-primary" onClick={() => navigate('/', { state: { page: fromPage } })}>

                  Go back
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
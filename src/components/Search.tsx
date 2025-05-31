import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { baseURL } from '../common/http-common';
import defaultImage from '../assets/poster_not_found.png'; // Default image path
import { Container, Row, Col, Card, CardImg } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners'; // Example loading spinner library

// Define a type for the detailed film object
type DetailedFilm = {
  title: string;
  year: string;
  released: string;
  runtime: number;
  language: string;
  genre: string;
  director: string;
  poster: string | null;
};

const Search: React.FC = () => {
  const { title } = useParams<{ title: string }>(); // Extract the title parameter from the URL
  const [film, setFilm] = useState<DetailedFilm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        console.log(`Fetching film details for title: ${title}`); // Debug log
        const response = await fetch(`${baseURL}/ofilm/${title}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: DetailedFilm = await response.json(); // API returns a single film object

        // Check if the data contains the expected fields (e.g. title)
        if (!data || !data.title) {
          setError(true);
          setFilm(null);
          return; // Exit early if no film found
        }

        setFilm(data);
        setError(false);
      } catch (error) {
        console.error('Error fetching film details:', error);
        setError(true);
        setFilm(null);
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      setLoading(true);
      fetchFilmDetails();
    }
  }, [title]);

  return (
    <Container
      fluid
      style={{
        display: 'flex',
        flexDirection: 'column',
        
        padding: 0, // Remove default padding
      }}
    >
      {loading && (
        <div className="text-center mt-5">
          <ClipLoader color="#000" size={50} /> {/* Loading spinner */}
          <p className="mt-3">Searching for the film...</p>
        </div>
      )}

      {!loading && (!film || error) && (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
          <div className="text-center mt-5">
            <h3>No Record Found</h3>
            <p>Sorry, we couldn't find any films with the provided wording.</p>
          </div>
          <div className="text-center px-3 pb-3"> {/* Use mt-auto and padding */}
            <Link to="/" className="btn btn-primary">
              Go back
            </Link>
          </div>
        </div>
      )}

      {!loading && film && (
        <Row className="g-0"> {/* Ensure the Row takes full height */}
          <Col md={3} style={{ position: 'relative' }}> {/* Ensure the Col takes full height */}
            <Card style={{ width: '100%', height: '100%' }}> {/* Ensure the Card takes full height */}
              <CardImg
                variant="top"
                src={film.poster ? film.poster : defaultImage}
                alt={film.title || 'Film Poster'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  // If the image fails to load, set the src to defaultImage
                  (e.target as HTMLImageElement).src = defaultImage;
                }}
              />
            </Card>
            
          </Col>
          <Col md={5}> {/* Ensure the Col takes full height */}
            <Card style={{ width: '100%', height: '100%' }}> {/* Ensure the Card takes full height */}
              <Card.Body className="d-flex flex-column">
                <>
                  <Row>
                    <Col xs={3} className="text-start">
                      <strong>Title:</strong>
                    </Col>
                    <Col xs={9}>{film.title}</Col>
                  </Row>
                  <Row>
                    <Col xs={3} className="text-start">
                      <strong>Year:</strong>
                    </Col>
                    <Col xs={9}>{film.year}</Col>
                  </Row>
                  <Row>
                    <Col xs={3} className="text-start">
                      <strong>Released:</strong>
                    </Col>
                    <Col xs={9}>{film.released}</Col>
                  </Row>
                  <Row>
                    <Col xs={3} className="text-start">
                      <strong>Runtime:</strong>
                    </Col>
                    <Col xs={9}>{film.runtime} minutes</Col>
                  </Row>
                  <Row>
                    <Col xs={3} className="text-start">
                      <strong>Language:</strong>
                    </Col>
                    <Col xs={9}>{film.language}</Col>
                  </Row>
                  <Row>
                    <Col xs={3} className="text-start">
                      <strong>Genre:</strong>
                    </Col>
                    <Col xs={9}>{film.genre}</Col>
                  </Row>
                  <Row>
                    <Col xs={3} className="text-start">
                      <strong>Director:</strong>
                    </Col>
                    <Col xs={9}>{film.director}</Col>
                  </Row>
                  {/* Add the "Go back" button at the bottom */}
                  <div className="mt-auto text-start pt-3">
                    {/* Use mt-auto to push the button to the bottom */}
                    <Link to="/" className="btn btn-primary">
                      Go back
                    </Link>
                  </div>
                </>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Search;
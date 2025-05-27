import React, { useState, useEffect, useMemo } from 'react';
import defaultImage from '../assets/poster_not_found.png'; // Default image path
import PaginationComponent from './PaginationComponent';
import { baseURL } from '../common/http-common';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// Define a type for the film object
type Film = {
  _id: string;
  title: string;
  year: string;
  poster: string | null; // poster can be a string, null, or ''
};

const Card: React.FC = () => {
  // Use proper types for state
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalFilms, setTotalFilms] = useState<number>(0);

  // Memoize the filtered films to avoid re-computing on every render
  const filteredFilms = useMemo(() => {
    return films.filter((film) => film.poster !== null && film.poster !== '');
  }, [films]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/films`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Film[] = await response.json();
        setTotalFilms(data.length);
        setFilms(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Memoize the films to display on the current page
  const filmsToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return filteredFilms.slice(startIndex, endIndex);
  }, [currentPage, filteredFilms]);

  if (loading) {
    return <div style={{ display: 'none', color: 'white' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ display: 'none', color: 'white' }}>Error: {error}</div>;
  }

  return (
    <div>
      <div className="container">
        {/* Render Pagination above the list of films */}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(totalFilms / 8)}
          onPageChange={handlePageChange}
        />
        <div className="row row-cols-1 row-cols-md-4 g-4" style={{ marginTop: '20px' }}>
          {filmsToDisplay.map((film) => (
            <div className="col" key={film._id}>
              <Link to={`/detail/${film._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ height: '550px' }}>
                  <img
                    src={
                      // Handle invalid poster values
                      film.poster === null || film.poster === '' || film.poster === 'null'
                        ? defaultImage
                        : film.poster
                    }
                    className="card-img-top"
                    alt={film.title}
                    style={{ height: '450px', objectFit: 'cover' }}
                    title={film.title}
                    onError={(e) => {
                      // If the image fails to load, set the src to defaultImage
                      (e.target as HTMLImageElement).src = defaultImage;
                    }}
                  />
                  <div className="card-body">
                    <h6
                      className="card-title"
                      style={{ fontSize: '16px', fontWeight: 'bold' }}
                      title={film.title}
                    >
                      {film.title.length > 80 ? `${film.title.substring(0, 80)}..` : film.title}
                    </h6>
                    <p className="card-text" style={{ color: 'grey' }}>
                      {film.year}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
import React, { useEffect, useState } from 'react';
import defaultImage from '../assets/poster_not_found.png';
import { baseURL } from '../common/http-common';
import { Link } from 'react-router-dom';

type Film = {
  _id: string;
  title: string;
  year: string;
  released: string;
  poster: string | null;
};

interface FilteredCardProps {
  selectedMonth: string | null;
}

const FilteredCard: React.FC<FilteredCardProps> = ({ selectedMonth }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/films`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Film[] = await response.json();
        setFilms(data);
      } catch (error: any) {
        setError(error.message);
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredFilms = films.filter((film) => {
    if (!selectedMonth) return true;
    const releasedMonth = film.released.split(' ')[1];
    return releasedMonth?.toLowerCase() === selectedMonth.toLowerCase().substring(0, 3);
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log('Filtered Films:', filteredFilms);

  return (
    <div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4" style={{ marginTop: '20px' }}>
          {filteredFilms.map((film) => (
            <div className="col" key={film._id}>
              <Link to={`/detail/${film._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ height: '550px' }}>
                  <img
                    src={
                      film.poster === null ||
                      film.poster === '' ||
                      film.poster === 'null'
                        ? defaultImage
                        : film.poster
                    }
                    className="card-img-top"
                    alt={film.title}
                    style={{ height: '450px', objectFit: 'cover' }}
                    title={film.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultImage;
                    }}
                  />
                  <div className="card-body">
                    <h6 className="card-title" style={{ fontSize: '16px', fontWeight: 'bold' }} title={film.title}>
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

export default FilteredCard;

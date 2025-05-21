// src/components/TestComponent.tsx
import React, { useState, useEffect } from 'react';
import defaultImage from '../assets/poster_not_found.png';

const Card: React.FC = () => {
  const [films, setFilms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pcpdfilm.starsknights.com:18888/api/v2/films');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Filter out films with null poster
        const filteredFilms = data.filter((film: any) => film.poster !== null && film.poster !== "");
        setFilms(filteredFilms);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ marginTop: "50px" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ marginTop: "50px" }}>Error: {error}</div>;
    
  }

  return (
    <div style={{ marginTop: "50px" }}>
    <div class="container">
      <div class="row row-cols-1 row-cols-md-4 g-4" style={{ marginTop: "220px" }}>
        {films.map((film) => (
          <div class="col" key={film._id}>
            <div class="card" style={{ height: '550px' }}>
              <img
                src={film.poster}
                class="card-img-top"
                alt={film.title}
                onError={(e) => { e.target.src = defaultImage }}
                style={{ height: '450px', objectFit: 'cover' }}
                title={film.title} // add title attribute to display on hover
              />
              <div class="card-body">
                <h6 class="card-title" style={{
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
                title={film.title} // add title attribute to display on hover
                >
                  {film.title.length > 80 ? film.title.substring(0, 80) + '...' : film.title}
                </h6>
                <p class="card-text" style={{ color: "grey" }}>
                  {film.year}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Card;
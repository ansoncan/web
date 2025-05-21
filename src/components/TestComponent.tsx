// src/TestComponent.tsx
import React, { useState, useEffect } from 'react';

const TestComponent: React.FC = () => {
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
        setFilms(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Films</h1>
      <ul>
        {films.map((film) => (
          <li key={film._id}>
            {film.title} - {film.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestComponent;
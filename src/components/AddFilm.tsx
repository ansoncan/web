// src/components/AddFilm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AddFilm: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    filmName: '',
    director: '',
    releaseYear: '',
    genre: '',
    poster: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/films`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Film added successfully');
        navigate('/films'); // Redirect to film list page
      } else {
        alert('Failed to add film');
      }
    } catch (error) {
      console.error('Error adding film:', error);
    }
  };

  return (
    <div>
      <h2>Add Film</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Film Name:</label>
          <input
            type="text"
            name="filmName"
            value={formData.filmName}
            onChange={handleChange}
            readOnly // Film name cannot be changed
          />
        </div>
        <div>
          <label>Director:</label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Release Year:</label>
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Poster:</label>
          <input
            type="text"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            readOnly // Poster cannot be changed
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/films')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddFilm;
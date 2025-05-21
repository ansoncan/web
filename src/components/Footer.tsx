// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', // Light grey background
      padding: '5px 0',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      bottom: 0,
      width: '100%'
    }}>
      <p>&copy; {new Date().getFullYear()} FilmStores. All rights reserved.</p>
    </div>
  );
};

export default Footer;
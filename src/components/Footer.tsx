// src/components/Footer.tsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  // State to track the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Effect to update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format the date and time
  const formattedDateTime = currentTime.toLocaleDateString('en-UK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) + ' ' + currentTime.toLocaleTimeString('en-UK', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  return (
    <Container
      fluid
      style={{
        backgroundColor: '#f8f9fa', // Light grey background
        padding: '10px 0',
        position: 'relative',
        bottom: 0,
        textAlign: 'center', // Center all text in the container
      }}
    >
      <Row className="justify-content-center align-items-center">
        {/* Copyright text */}
        <Col xs="auto">
          <p>&copy; {new Date().getFullYear()} FilmStores. All rights reserved.</p>
        </Col>

        {/* Date and time */}
        <Col xs="auto">
          <p>{formattedDateTime}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;


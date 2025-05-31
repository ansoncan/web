import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { baseURL } from '../common/http-common';
import defaultImage from '../assets/poster_not_found.png';
import { Container, Row, Col, Card, CardImg, Button, Form, Modal } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';

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
  const { title } = useParams<{ title: string }>();
  const [film, setFilm] = useState<DetailedFilm | null>(null);
  const [originalFilm, setOriginalFilm] = useState<DetailedFilm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isStaff, setIsStaff] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const authKey = localStorage.getItem("authKey");
    setIsStaff(userType === "1" && !!authKey);
  }, []);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/ofilm/${title}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        if (!data || !data.title) {
          setError(true);
          setFilm(null);
          return;
        }

        const numericRuntime = typeof data.runtime === "string"
          ? parseInt(data.runtime)
          : data.runtime;

        const cleanedData: DetailedFilm = {
          ...data,
          runtime: isNaN(numericRuntime) ? 0 : numericRuntime,
        };

        setFilm(cleanedData);
        setOriginalFilm(cleanedData);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!film) return;
    const { name, value } = e.target;
    setFilm({ ...film, [name]: name === "runtime" ? Number(value) : value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (originalFilm) setFilm(originalFilm);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    if (!film) return;

    const payload = {
      title: film.title,
      year: film.year,
      runtime: Number(film.runtime),
      language: film.language,
      genre: film.genre,
      director: film.director,
      poster: film.poster || null,
    };

    try {
      const response = await fetch(`${baseURL}/film`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          k: localStorage.getItem("authKey") || "",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowSuccess(true);
        setOriginalFilm(film);
        setIsEditing(false);
      } else {
        const errorText = await response.text();
        console.error("Failed to add film:", errorText);
        alert("Failed to add film. Please check the input and try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while adding the film.");
    } finally {
      setShowModal(false);
    }
  };

  const confirmUpdate = () => setShowModal(true);
  const cancelModal = () => setShowModal(false);

  return (
    <Container fluid className="p-0">
      {loading && (
        <div className="text-center mt-5">
          <ClipLoader color="#000" size={50} />
          <p className="mt-3">Searching for the film...</p>
        </div>
      )}

      {!loading && (!film || error) && (
        <div className="text-center mt-5">
          <h3>No Record Found</h3>
          <p>Sorry, we couldn't find any films with the provided wording.</p>
          <Link to="/" className="btn btn-primary mt-3">Go back</Link>
        </div>
      )}

      {!loading && film && (
        <Row className="g-0">
          <Col md={3}>
            <Card style={{ height: '100%' }}>
              <CardImg
                variant="top"
                src={film.poster || defaultImage}
                alt={film.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultImage;
                }}
              />
            </Card>
          </Col>

          <Col md={5}>
            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card.Body>
                {["title", "year", "released", "runtime", "language", "genre", "director"].map((field) => (
                  <Row key={field} className="mb-2">
                    <Col xs={3}><strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong></Col>
                    <Col xs={9}>
                      <Form.Control
                        type={field === "runtime" ? "number" : "text"}
                        name={field}
                        value={String((film as any)[field])}
                        readOnly={field === "title" || !isEditing || !isStaff}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                ))}

                <div className="mt-4 d-flex">
                  <Link to="/" className="btn btn-outline-primary me-auto">Go back</Link>
                  {isStaff && (
                    !isEditing ? (
                      <Button variant="primary" onClick={handleEdit}>Edit</Button>
                    ) : (
                      <>
                        <Button variant="success" className="ms-2" onClick={confirmUpdate}>Update</Button>
                        <Button variant="secondary" className="ms-2" onClick={handleCancel}>Cancel</Button>
                      </>
                    )
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Confirm Modal */}
      <Modal show={showModal} onHide={cancelModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to add this film to the database?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelModal}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>🎉 Film added successfully!</p>
          <Button variant="primary" onClick={() => setShowSuccess(false)}>
            OK
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Search;

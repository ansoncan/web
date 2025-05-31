import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { baseURL } from "../common/http-common";
import { useNavigate } from "react-router-dom";

interface Film {
  year: string;
  released: string;
  runtime: string;
  language: string;
  genre: string;
  director: string;
}

const AddFilm: React.FC = () => {
  const [film, setFilm] = useState<Film>({
    year: "",
    released: "",
    runtime: "",
    language: "",
    genre: "",
    director: "",
  });
  const [initialFilm, setInitialFilm] = useState<Film>({
    year: "",
    released: "",
    runtime: "",
    language: "",
    genre: "",
    director: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Set initial film values
    setInitialFilm(film);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilm({ ...film, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFilm(initialFilm);
    setIsEditing(false);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAddToDatabase = () => {
    setShowModal(true);
  };

  const confirmAddToDatabase = async () => {
    try {
      const response = await fetch(`${baseURL}/film`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          k: localStorage.getItem("authKey") || "",
        },
        body: JSON.stringify(film),
      });

      if (response.ok) {
        alert("Film added successfully!");
        navigate("/search");
      } else {
        setErrorMessage("Failed to add film. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="text"
            name="year"
            value={film.year}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Released</Form.Label>
          <Form.Control
            type="text"
            name="released"
            value={film.released}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Runtime</Form.Label>
          <Form.Control
            type="text"
            name="runtime"
            value={film.runtime}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Language</Form.Label>
          <Form.Control
            type="text"
            name="language"
            value={film.language}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={film.genre}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Director</Form.Label>
          <Form.Control
            type="text"
            name="director"
            value={film.director}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleEdit} className="me-2">
          Edit
        </Button>
        <Button variant="secondary" onClick={handleCancel} className="me-2">
          Cancel
        </Button>
        <Button variant="success" onClick={handleAddToDatabase}>
          Add to Database
        </Button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Form>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to add this film to the database?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmAddToDatabase}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddFilm;

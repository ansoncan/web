import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { userAPI } from '../common/http-common';


interface LoginForm {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState<LoginForm>({ username: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);
  const [loginError, setLoginError] = useState<string>('');
  const [userInfo, setUserInfo] = useState<{ firstname: string; lastname: string}> ({firstname: "", lastname: ""});

  const handleShow = () => {
    setShowModal(true);
    setFormData({ username: '', password: '' });
    setErrors({}); // Reset errors when showing the modal
  };

  const handleClose = () => {
    setShowModal(false);
    setErrors({}); // Reset errors when closing the modal
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear the error for the specific field when the user starts typing
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
      //   console.log(formData);
      //   setIsLoggedIn(true);
      //   handleClose();
      //   setErrors({});
      // })

    //   if(formData.username === 'user' && formData.password === 'abcd1234') {
    //     console.log('Login successful');
    //     setIsLoggedIn(true);
    //     handleClose(); 
    //     setErrors({});
    //   } else {
    //     setLoginError('Invalid username or password');
    //   }
    // })


    fetch(`${userAPI.uri}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: formData.username, password: formData.password })
    }).then((response) => {
        if(response.ok) {
          response.json().then((data) => {                               
            localStorage.setItem('userInfo', JSON.stringify(data. accessToken));
            setUserInfo({ firstname: data.firstName, lastname: data.lastName});                             
            setIsLoggedIn(true);                
            handleClose();
            setErrors({});
          })              
        } else {
          setLoginError(`(${response.status}) Invalid username or password`);
        }             
    }).catch((error) => {
      setLoginError(`(${error.status}) An error occurred.  Please try again later.`);
    })
  })


      .catch((err) => {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <>
        Welcome, {userInfo.lastname}, {userInfo.firstname} ,
         
        <Button onClick={handleLogout} variant="info">Logout</Button>
      </>
    );
  } else {
    return (
      <>
        <Button onClick={handleShow} variant="info">Login</Button>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              {loginError && <Form.Label style={{color: "red"}}>{loginError}</Form.Label>}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">Login</Button>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
};

export default Login;

import React, { useState } from 'react';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Register() {
  const [validated, setValidated] = useState(false);

  const submitForm = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const form = event.currentTarget;
    if (form.checkValidity()) {
      // Form is valid, perform form submission or other actions
      console.log('Form submitted');
    } else {
      setValidated(true); // Set the "validated" state to true to display validation errors
    }
  };

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col />
        <Col className='text-center'>
          <h2>
            <b>Register</b>
          </h2>
        </Col>
        <Col />
      </Row>
      <Row className='justify-content-center'>
        <Col />
        <Col>
          <Container style={{ width: '400px' }}>
            <Form noValidate validated={validated} onSubmit={submitForm}>
              <Form.Group controlId='usernameCustomValidation'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='Name' required />
                <Form.Control.Feedback type='invalid'>
                  Please provide a valid username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-2' controlId='emailCustomValidation'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Email' required />
                <Form.Control.Feedback type='invalid'>
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className='mt-2'
                controlId='passwordCustomValidation01'
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' required />
                <Form.Control.Feedback type='invalid'>
                  Please provide a password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className='mt-2'
                controlId='passwordCustomValidation02'
              >
                <Form.Label>Comfirm Password</Form.Label>
                <Form.Control type='password' placeholder='Password' required />
                <Form.Control.Feedback type='invalid'>
                  Please provide a password.
                </Form.Control.Feedback>
              </Form.Group>
              <Row className='mt-3'>
                <Col lg={4} xs={4}>
                  <Button type='submit'>Login</Button>
                </Col>
                <Col className='d-flex align-items-center text-end'>
                  <Container className='px-0'>
                    <span className='me-2'>Have an account?</span>
                    <Link to={'/login'}>Login here</Link>
                  </Container>
                </Col>
              </Row>
            </Form>
          </Container>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Register;

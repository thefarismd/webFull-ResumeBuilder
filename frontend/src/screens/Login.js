import React, { useState, useEffect } from 'react';
import { Row, Form, Button, Col, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import userLogin from '../features/api/loginAction';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });

  const userLoginState = useSelector((state) => state.userLogin);
  const { userInfo, isLoading, error } = userLoginState;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const onChangeHandler = (event) => {
    setLoginInputs({
      ...loginInputs,
      [event.target.type]: event.target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const form = event.currentTarget;

    if (form.checkValidity()) {
      // Form is valid, perform form submission or other actions
      dispatch(
        userLogin({ email: loginInputs.email, password: loginInputs.password })
      );
    } else {
      setValidated(true); // Set the "validated" state to true to display validation errors
    }
  };

  return (
    <Container className='mt-5'>
      {error && <Message variant='danger'>{error}</Message>}
      {isLoading && <Loader></Loader>}
      <Row className='justify-content-center'>
        <Col />
        <Col className='text-center'>
          <h2>
            <b>Login</b>
          </h2>
        </Col>
        <Col />
      </Row>
      <Row className='justify-content-center'>
        <Col />
        <Col>
          <Container style={{ width: '400px' }}>
            <Form noValidate validated={validated} onSubmit={submitForm}>
              <Form.Group controlId='emailCustomValidation'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Email'
                  onChange={onChangeHandler}
                  pattern='^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a valid email with a top-level domain (e.g.,
                  .com).
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-2' controlId='passwordCustomValidation'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  onChange={onChangeHandler}
                  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Password must contain at least one lowercase letter, one
                  uppercase letter, one digit, one special character, and be at
                  least 8 characters long.
                </Form.Control.Feedback>
              </Form.Group>
              <Row className='mt-3'>
                <Col lg={4} xs={4}>
                  <Button type='submit'>Login</Button>
                </Col>
                <Col className='d-flex align-items-center text-end'>
                  <Container className='px-0'>
                    <span className='me-2'>New Customer?</span>
                    <Link to={'/register'}>Register here</Link>
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

export default Login;

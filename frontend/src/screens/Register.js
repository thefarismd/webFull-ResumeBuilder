import React, { useState } from 'react';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import registerUser from '../features/actions/registerAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useEffect } from 'react';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Extract the api state when registering
  const userRegisterState = useSelector((state) => state.userRegister);
  const { userInfo, isLoading, error } = userRegisterState;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const onChangeHandler = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };
  const [validated, setValidated] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const form = event.currentTarget;

    //if password does not match, reset comfirmPassword and trigger feedback
    if (registerData.password !== registerData.comfirmPassword) {
      setRegisterData((prevValue) => ({
        ...prevValue,
        confirmPassword: '',
      }));
      setValidated(true); // Set the "validated" state to true to display validation errors
    }

    if (form.checkValidity()) {
      // Form is valid, perform form submission or other actions
      dispatch(
        registerUser({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        })
      );
    } else {
      setValidated(true);
    }
  };

  return (
    <Container className='mt-5'>
      {error && <Message variant='danger'>{error}</Message>}
      {isLoading && <Loader></Loader>}
      <Row className='justify-content-center'>
        <Col className='text-center'>
          <h2>
            <b>Register</b>
          </h2>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col>
          <Container className='w-100 w-lg-auto' style={{ maxWidth: '400px' }}>
            <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
              <Form.Group controlId='usernameCustomValidation'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  autoComplete='off'
                  placeholder='Name'
                  pattern="^[A-Za-z\s'\-]+$"
                  required
                  onChange={onChangeHandler}
                  value={registerData.name}
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a name with only alphabets.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-2' controlId='emailCustomValidation'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  autoComplete='off'
                  placeholder='Email'
                  pattern='^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
                  required
                  onChange={onChangeHandler}
                  value={registerData.email}
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a valid email with a top-level domain (e.g.,
                  .com).
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className='mt-2'
                controlId='passwordCustomValidation01'
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  placeholder='Password'
                  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$'
                  required
                  onChange={onChangeHandler}
                  value={registerData.password}
                />
                <Form.Control.Feedback type='invalid'>
                  Password must contain at least one lowercase letter, one
                  uppercase letter, one digit, one special character, and be at
                  least 8 characters long.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className='mt-2'
                controlId='passwordCustomValidation02'
              >
                <Form.Label>Comfirm Password</Form.Label>
                <Form.Control
                  type='password'
                  name='confirmPassword'
                  placeholder='Password'
                  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$'
                  required
                  onChange={onChangeHandler}
                  value={registerData.comfirmPassword}
                />
                <Form.Control.Feedback type='invalid'>
                  Passwords must match.
                </Form.Control.Feedback>
              </Form.Group>
              <Row className='mt-3'>
                <Col lg={4} xs={4}>
                  <Button type='submit'>Register</Button>
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
      </Row>
    </Container>
  );
}

export default Register;

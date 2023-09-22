import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserProfile,
  updateUserProfile,
} from '../features/actions/profileAction';

function Profile() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isMounted = useRef();

  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const userProfileState = useSelector((state) => state.userProfile);
  const { userInfo, isLoading, error, updateSuccess } = userProfileState;

  useEffect(() => {
  if (!userInfo) {
    dispatch(getUserProfile());
  } else {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      name: userInfo.name || prevProfile.name,
      email: userInfo.email || prevProfile.email,
    }));
  }
    
  }, [userInfo, dispatch]);

  const onChangeHandler = (event) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };

  //Form submission with validation
  const [validated, setValidated] = useState(false);
  const onSubmitHandler = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const form = event.currentTarget;

    //if password does not match, reset confirmPassword and trigger feedback
    if (userProfile.password !== userProfile.confirmPassword) {
      setUserProfile((prevValue) => ({
        ...prevValue,
        confirmPassword: '',
      }));
      setValidated(true); // Set the "validated" state to true to display validation errors
    }

    if (form.checkValidity()) {
      // Form is valid, perform form submission or other actions
      dispatch(
        updateUserProfile({
          _id: userInfo._id,
          name: userProfile.name,
          email: userProfile.email,
          password: userProfile.password,
        })
      );

      setUserProfile({
        name: '',
        email: '',
        password: '',
        confirmPassword:''
      });
      
    } else {
      setValidated(true);
    }
  };

  return (
    <Container className='mt-5'>
      {error && <Message variant='danger'>{error}</Message>}
      {isLoading && <Loader></Loader>}
      {updateSuccess && <Message variant='success'>Profile Updated</Message>}
      <Row className='justify-content-center'>
        <Col />
        <Col className='text-center'>
          <h2>Update Profile</h2>
        </Col>
        <Col />
      </Row>
      <Row className='justify-content-center'>
        <Col />
        <Col>
          <Container style={{ width: '400px' }}>
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
                  value={userProfile.name}
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
                  value={userProfile.email}
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
                  value={userProfile.password}
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
                <Form.Label>confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  name='confirmPassword'
                  placeholder='Password'
                  pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,}$'
                  required
                  onChange={onChangeHandler}
                  value={userProfile.confirmPassword}
                />
                <Form.Control.Feedback type='invalid'>
                  Passwords must match.
                </Form.Control.Feedback>
              </Form.Group>
              <Row className='mt-3'>
                <Col lg={4} xs={4}>
                  <Button type='submit'>Update</Button>
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

export default Profile;

import React from 'react';
import {
  Container,
  NavDropdown,
  Navbar,
  NavbarBrand,
  Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginReset } from '../features/loginSlice.js';
import { registerReset } from '../features/registerSlice.js';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(loginReset());
    dispatch(registerReset());
    navigate('/login');
  };

  // Destructure both userLogin and userRegister from the store
  const { userLogin, userRegister } = useSelector((store) => store);

  // Determine which userInfo to use
  const userInfo = userLogin?.userInfo || userRegister?.userInfo || null;

  const afterLoginComponent = userInfo ? (
    <NavDropdown
      title={
        <>
          <i className='fa-solid fa-user me-2'></i>
          {userInfo.name.toUpperCase()}
        </>
      }
    >
      <NavDropdown.Item>Profile</NavDropdown.Item>
      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    </NavDropdown>
  ) : null;

  const beforeLoginComponent = (
    <Nav.Link as={Link} to='/login'>
      <i className='fa-solid fa-user me-2'></i> Sign In
    </Nav.Link>
  );

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container>
          <NavbarBrand href='/'>
            <b>FRS ResumeBuilder</b>
          </NavbarBrand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? afterLoginComponent : beforeLoginComponent}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

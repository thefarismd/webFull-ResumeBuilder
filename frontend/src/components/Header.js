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
import { logout } from '../features/loginSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const afterLoginComponent = userInfo ? (
    <NavDropdown
      title={
        <>
          <i className='fa-solid fa-user me-2'></i>
          {userInfo.name.toUpperCase()}
        </>
      }
    >
      <NavDropdown.Item as={Link} to='/profile'>
        Profile
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to='/resume'>
        Resume
      </NavDropdown.Item>
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

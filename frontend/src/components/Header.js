import React from 'react';
import {
  Container,
  NavDropdown,
  Navbar,
  NavbarBrand,
  Nav,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const afterLoginComponent = (
    <NavDropdown title='Sign in'>
      <NavDropdown.Item>Profile</NavDropdown.Item>
      <NavDropdown.Item>Logout</NavDropdown.Item>
    </NavDropdown>
  );

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
              {true ? beforeLoginComponent : afterLoginComponent}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

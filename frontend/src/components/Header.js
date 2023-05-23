import React from 'react';
import { Container, Navbar, NavbarBrand } from 'react-bootstrap';

function Header() {
  return (
    <header>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <NavbarBrand href='/'>
            <b>FRS ResumeBuilder</b>
          </NavbarBrand>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

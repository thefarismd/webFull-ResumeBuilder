import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function DefaultLayout() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <main className='flex-fill'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;

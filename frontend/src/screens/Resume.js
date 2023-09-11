import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';

function Resume() {
  const [key, setKey] = useState('Personal Info');

  return (
    <Container className='mt-4 px-0'>
      <h2>Update Profile</h2>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className='mb-3'>
        <Tab eventKey='Personal Info' title='Home'>
          Tab content for Home
        </Tab>
        <Tab eventKey='Skills and Education' title='Skills and Education'>
          Tab content for Profile
        </Tab>
        <Tab eventKey='Experiences' title='Experiences'>
          Tab content for Contact
        </Tab>
        <Tab eventKey='Personal Projects' title='Personal Projects'>
          Tab content for Contact
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Resume;

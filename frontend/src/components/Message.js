import React from 'react';
import { Alert } from 'react-bootstrap';

function Message(props) {
  return (
    <div className='text-center mx-auto' style={{ width: '400px' }}>
      <Alert variant={props.variant}>{props.children}</Alert>
    </div>
  );
}

Message.defaultProps = {
  variant: 'info',
};

export default Message;

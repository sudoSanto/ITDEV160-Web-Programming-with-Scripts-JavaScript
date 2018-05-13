import React, { PropTypes } from 'react';

const Message = (props) => {
  return (
    <section key={ props.message.id }>
      <span className="message">
      { props.message.index } : { props.message.user } : { props.message.text }
      </span>
    </section>
  )
};

export default Message;

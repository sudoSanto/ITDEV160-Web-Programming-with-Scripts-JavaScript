import React, { PropTypes } from 'react';

const Quote = (props) => {
  return (
    <section key={ props.quote.id }>
      <blockquote>{ props.quote.text }</blockquote>
      <span className="author">{ props.quote.author }</span>
    </section>
  )
};

export default Quote;

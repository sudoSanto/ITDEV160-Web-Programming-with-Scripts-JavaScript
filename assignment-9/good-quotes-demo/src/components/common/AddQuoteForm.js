import React, { Component, PropTypes } from 'react';

class AddQuoteForm extends Component {
  constructor(props) {
    super(props)

    // Create input references
    this.textInput = React.createRef();
    this.authorInput = React.createRef();
  }

  addQuote(event) {
    event.preventDefault();

    // Create new quote object from input values
    let quote = {
      author: this.authorInput.current.value,
      text: this.textInput.current.value
    }

    this.props.addQuote(quote);

    this.authorInput.current.value = '';
    this.textInput.current.value = '';
  }

  render() {
    return(
      <form onSubmit={this.addQuote.bind(this)}>
        <textarea rows="5" cols="50" ref={ this.textInput }></textarea>
        <br />
        <input type="text" ref={ this.authorInput }></input>
        <input type="submit" />
      </form>
    )
  }
}

export default AddQuoteForm;

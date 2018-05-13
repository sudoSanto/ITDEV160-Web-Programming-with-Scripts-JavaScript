import React, { Component, PropTypes } from 'react';

class AddMessageForm extends Component {
  constructor(props) {
    super(props)

    // Create input references
    this.userInput = React.createRef();
    this.textInput = React.createRef();
  }

  addMessage(event) {
    event.preventDefault();

    // Create new quote object from input values
    let message = {
      user: this.userInput.current.value,
      text: this.textInput.current.value
    }

    this.props.addMessage(message);

    this.userInput.current.value = '';
    this.textInput.current.value = '';
  }

  render() {
    return(
      <form onSubmit={this.addMessage.bind(this)}>
        <textarea rows="5" cols="50" ref={ this.textInput }></textarea>
        <br />
        <input type="text" ref={ this.userInput }></input>
        <input type="submit" />
      </form>
    )
  }
}

export default AddMessageForm;

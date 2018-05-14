import React, { Component, PropTypes } from 'react';

class AddMessageForm extends Component {

  constructor(props) {
    super(props)

    // Create input references
    this.username = React.createRef();
    this.recUser = React.createRef();
    this.textInput = React.createRef();
  }



  componentDidUpdate() {
    let data = this.props.getCurrentUser();
    this.username.current.value = data.displayName;
  }

  addMessage(event) {
    event.preventDefault();
    let data = this.props.getCurrentUser();
    let message = {
      sentUser: data.displayName,
      //recUser: this.recUser,
      text: this.textInput.current.value,
      imageURL: data.photoURL
    }

    console.log(message);
    this.props.addMessage(message);

    this.textInput.current.value = '';
  }

  changeUsername(event) {
    event.preventDefault();
    // let user = this.props.getCurrentUser();
    // console.log(data.displayName);
    this.props.changeUsername(this.username.current.value);
    let user = this.props.getCurrentUser();
    console.log(user.displayName);
    this.username.current.value = user.displayName;
  }

  render() {
    return(
      <div>
        <form onSubmit={this.changeUsername.bind(this)}>
          Change Username:
          <input type="text" ref={ this.username }></input>
          <input type="submit" />
        </form>

        <br />

        <form onSubmit={this.addMessage.bind(this)}>
          Enter text:
          <input className="textBar" type="text" ref={ this.textInput }></input>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default AddMessageForm;

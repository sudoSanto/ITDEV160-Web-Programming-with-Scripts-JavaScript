import React, { Component, PropTypes } from 'react';

class UserInfo extends Component {

    constructor(props) {
      super(props);

      this.username = React.createRef();
      this.usernameInput = React.createRef();
      this.photoURLInput = React.createRef();
      this.photoURLLink = React.createRef();
    }

    componentDidMount() {
      let user = this.props.getCurrentUser();
      this.username.current.value = user.displayName;
      this.photoURLInput.current.value = user.photoURL;
    }

    componentDidUpdate() {
      let user = this.props.getCurrentUser();
      this.username.current.value = user.displayName;
      this.photoURLInput.current.value = user.photoURL;
    }

    changePhotoURL(event) {
      event.preventDefault();
      let user = this.props.getCurrentUser();
      this.props.changePhotoURL(user.id, this.photoURLInput.current.value);
      user = this.props.getCurrentUser();
      this.username.current.value = user.displayName;
    }

    getPhotoURL() {
      let userPhoto = this.props.getCurrentUser();
      return userPhoto.photoURL;
    }

  render() {
    return (
      <section>
        <h1>User Info</h1>
        <img src={ this.getPhotoURL() } height="50" width="50" />
        <form onSubmit={this.changePhotoURL.bind(this)}>
        <input type="text" ref={ this.photoURLInput }></input>
        <input type="submit" />
        </form>
        <input type="text" ref={ this.username }></input>
      </section>
    )
  }
}

export default UserInfo;


  // id: key,
  // email: data.email,
  // emailVerified: data.emailVerified,
  // phoneNumber: data.phoneNumber,
  // password: data.password,
  // displayName: data.displayName,
  // photoURL: data.photoURL,
  // disabled: data.disabled

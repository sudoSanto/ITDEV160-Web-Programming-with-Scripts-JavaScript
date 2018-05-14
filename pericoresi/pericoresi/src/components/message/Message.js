import React, { Component, PropTypes } from 'react';

class Message extends Component {
    constructor(props) {
      super(props)
    }

    MessageLine (message) {
      return (
        <div>
        <button className="removeMessageButton" onClick={ this.removeMessage.bind(this) }>X</button>
        {message.imageURL &&
          <img src={ message.imageURL } height="50" width="50" />
        }
        { message.sentUser } : { message.text }
        </div>
      )
    }

    MessageDirection () {
      let messageUser = this.props.getCurrentUser();
      if (this.props.message.sentUser == messageUser.displayName) {
        return "out-message";
      } else {
        return "in-message";
      }
    }

    removeMessage(event) {
      event.preventDefault();

      this.props.removeMessage(this.props.message.id);
    }

    render() {
      return (
        <section key={ this.props.message.id }>
          <span className={this.MessageDirection()}>
          { this.MessageLine(this.props.message)}
          </span>
        </section>
      )
    }
}

export default Message;

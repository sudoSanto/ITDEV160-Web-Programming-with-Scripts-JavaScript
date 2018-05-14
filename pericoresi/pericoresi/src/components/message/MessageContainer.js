import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Message from './Message';

class MessageContainer extends Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      <div className="message-container" >
      <Route path="/" render={() => (
        this.props.messages.slice().reverse().map(message =>
          <Message getCurrentUser={this.props.getCurrentUser} message={message} key={message.id} removeMessage={this.props.removeMessage} />
        )
      )} />
      <div className="message-container-bottom" ref={el => { this.el = el; }}/>
      </div>
    )
  }
}

export default MessageContainer;

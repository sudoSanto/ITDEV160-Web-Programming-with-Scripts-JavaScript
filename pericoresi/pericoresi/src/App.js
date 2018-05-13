import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import Header from './components/common/Header';
import Message from './components/message/Message';
import AddMessageForm from './components/common/AddMessageForm';
import About from './components/about/About';

// Initialize Firebase
var config = require('./config.json');
let pericoresiApp = firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
      super(props);

      // Set up React state
      this.state = {
        messages: []

      };
  }

  componentWillMount() {
    // Get db reference
    let db = pericoresiApp.database().ref('messages');

    // Wire event handler to handle when a new quote is added to firebase
    db.on('child_added', snapshot => {
      // Update React state
      let data = snapshot.val();

      let message = {
        id: snapshot.key,
        index: data.index,
        user: data.user,
        text: data.text
      };

      this.setState({ messages: [message].concat(this.state.messages) })
    })
  }

  addMessage(message) {
    let db = pericoresiApp.database().ref('messages');

    db.once('value')
      .then( function(snapshot) {
        message.index = snapshot.numChildren() + 1;
        db.push(message);
      })
  }

  render() {
    const { messages } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <AddMessageForm addMessage={this.addMessage} />
          <main>

            <Route exaxt={true} path="/" render={() => (
              messages.slice().reverse().map(message =>
                <Message message={message} key={message.id} />
              )
            )} />

            <Route path="/about" component={About} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

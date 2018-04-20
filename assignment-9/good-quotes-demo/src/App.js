import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBEhi8HDFBYvNGtm6aBw-P8LyDMKm6STc0",
  authDomain: "goodquotesdemo-a8848.firebaseapp.com",
  databaseURL: "https://goodquotesdemo-a8848.firebaseio.com",
  projectId: "goodquotesdemo-a8848",
  storageBucket: "goodquotesdemo-a8848.appspot.com",
  messagingSenderId: "700237541412"
};

var firebaseApp = firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
      super(props);

      // Create input references
      this.textInput = React.createRef();
      this.authorInput = React.createRef();

      // Set up React state
      this.state = {
        quotes: []

      };
  }

  componentWillMount() {
    // Get db reference
    let db = firebaseApp.database().ref('quotes');

    // Wire event handler to handle when a new quote is added to firebase
    db.on('child_added', snapshot => {
      // Update React state
      let data = snapshot.val();

      let quote = {
        id: snapshot.key,
        text: data.text,
        author: data.author
      };

      this.setState({ quotes: [quote].concat(this.state.quotes) })
    })
  }

  addQuote(event) {
    event.preventDefault();

    // Create new quote object from input values
    let quote = {
      author: this.authorInput.current.value,
      text: this.textInput.current.value
    }

    // Get db reference, add new quote, then reset textboxes
    let db = firebaseApp.database().ref('quotes');
    db.push(quote);

    this.authorInput.current.value = '';
    this.textInput.current.value = '';
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.addQuote.bind(this)}>
          <textarea rows="5" cols="50" ref={ this.textInput }></textarea>
          <input type="text" ref={ this.authorInput }></input>
          <input type="submit" />
        </form>

      </div>
    );
  }
}

export default App;

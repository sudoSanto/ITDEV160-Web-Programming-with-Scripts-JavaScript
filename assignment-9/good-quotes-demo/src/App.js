import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import Header from './components/common/Header';
import Quote from './components/quote/Quote';
import AddQuoteForm from './components/common/AddQuoteForm';
import About from './components/about/About';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBEhi8HDFBYvNGtm6aBw-P8LyDMKm6STc0",
  authDomain: "goodquotesdemo-a8848.firebaseapp.com",
  databaseURL: "https://goodquotesdemo-a8848.firebaseio.com",
  projectId: "goodquotesdemo-a8848",
  storageBucket: "goodquotesdemo-a8848.appspot.com",
  messagingSenderId: "700237541412"
};

let firebaseApp = firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
      super(props);

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

  addQuote(quote) {
    let db = firebaseApp.database().ref('quotes');
    db.push(quote);
  }

  render() {
    const { quotes } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <AddQuoteForm addQuote={this.addQuote} />
          <main>

            <Route exaxt={true} path="/" render={() => (
              quotes.map(quote =>
                <Quote quote={quote} key={quote.id} />
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

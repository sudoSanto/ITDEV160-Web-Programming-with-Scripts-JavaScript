import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import firebase from 'firebase';
import Header from './components/common/Header';
//import Message from './components/message/Message';
import MessageContainer from './components/message/MessageContainer';
import AddMessageForm from './components/common/AddMessageForm';
import UserInfo from './components/user/UserInfo';
import Login from './components/user/Login';

// Initialize Firebase
let config = require('./config.json');
let pericoresiApp = firebase.initializeApp(config);
let userKey = '';
// Test user data
// let testUser = {
//   email: 'matthew.j.dalsanto@gmail.com',
//   emailVerified: true,
//   phoneNumber: '414-217-5555',
//   password: 'test',
//   displayName: 'sudoSanto',
//   photoURL: '',
//   disabled: false
// };
//
// let testMessage = {
//   index: 1,
//   timestamp: '',
//   sentUser: 'sudoSanto',
//   recUser: '',
//   text: 'test text',
//   photoURL: '',
//   disabled: false
// };

class App extends Component {
  constructor(props) {
      super(props);

      // Set up React state
      this.state = {
        messages: []

      };

  }

  componentWillMount() {
    // Get db messages reference
    let dbMessages = pericoresiApp.database().ref('messages');
    // Get db users reference
    let dbUsers = pericoresiApp.database().ref('users');

    //load test data
    //dbUsers.push(testUser);
    //dbMessages.push(testMessage);

    function getMessageData(key, data) {
      let message = {
        id: key,
        index: data.index,
        timestamp: data.timestamp,
        sentUser: data.sentUser,
        recUser: data.recUser,
        text: data.text,
        imageURL: data.imageURL,
        disabled: data.disabled
      };
      return message;
    }

    function getUserData(key, data) {
      let user = {
        id: key,
        email: data.email,
        emailVerified: data.emailVerified,
        phoneNumber: data.phoneNumber,
        password: data.password,
        displayName: data.displayName,
        photoURL: data.photoURL,
        disabled: data.disabled
      };
      return user;
    }

    function swapUpdatedMessageData(data) {
      let message = {
        id: data.id,
        index: data.index,
        timestamp: data.timestamp,
        sentUser: data.sentUser,
        recUser: data.recUser,
        text: data.text,
        imageURL: data.imageURL,
        disabled: data.disabled
      };
      return message;
    }

    // Wire event handler to handle when a new message is added to firebase
    dbMessages.on('child_added', snapshot => {
      this.setState({ messages: [getMessageData(snapshot.key, snapshot.val())].concat(this.state.messages) })
      console.log(snapshot.val());
      console.log(this.state.messages);
      console.log('child added' + this.state.messages.length);
      console.log(this.state.messages);
    })

    // Wire event handler to handle when a new message is updated in firebase
    dbMessages.on('child_changed', snapshot => {
      let newMessage = getMessageData(snapshot.key, snapshot.val());
      let newState = [];
      console.log('child updated');

      this.state.messages.forEach(function(message){

        console.log(message.length);
      });
    })

    // Wire event handler to handle when a new message is deleted from firebase
    dbMessages.on('child_removed', snapshot => {
      let removedData = getMessageData(snapshot.key, snapshot.val());
      let newState = this.state.messages.filter(function(data) {
        return data.id !== removedData.id;
      });
      console.log('child removed');
      this.setState({ messages: newState })
    })
  }

  // Push new message to database
  addMessage(message) {
    if (message.text != '') {
      let dbMessages = pericoresiApp.database().ref('messages');

      dbMessages.once('value')
        .then( function(snapshot) {
          message.index = snapshot.numChildren() + 1;
          let newPostKey = dbMessages.push().key;
          message.id = newPostKey;
          let messageID = {};
          messageID['/' + message.id] = message;
          dbMessages.update(messageID);
        })
    }
  }

  // Get user info
  getCurrentUser() {
    let tempKey = '-LCRHJXYOjlKMDSRk15M';
    console.log(userKey);
    if (userKey == '') {
      userKey = tempKey;
    }

    let tempUser = pericoresiApp.database().ref('users/' + userKey);
    let item = {};

    tempUser.on('value', function (snapshot) {
      item = snapshot.val();
      item.id = snapshot.key;
    });
    return item;
  }

  // Change username and update database
  changeUsername(newUsername) {
    let allUsers = pericoresiApp.database().ref('users');
    let scanUsers = [];
    let isTaken = false;

    allUsers.on('value', function (snapshot) {
      scanUsers = snapshot.val();
      for (var uKey in scanUsers) {
        if (scanUsers.hasOwnProperty(uKey)) {
          if (scanUsers[uKey].displayName == newUsername) {
            console.log(scanUsers[uKey].displayName);
            isTaken = true;
            userKey = scanUsers[uKey].id;
          }
        }
      }

      if (isTaken == false) {
        let newUser = {};
        newUser.displayName = newUsername;
        newUser.photoURL = 'http://justsomething.co/wp-content/uploads/2016/09/27-hilarious-photos-of-dogs-with-fake-eyebrows-that-will-make-your-day-so-much-better-02.jpg';
        userKey = allUsers.push().key;
        newUser.id = userKey;
        let newUserID = {};
        newUserID['/' + newUser.id] = newUser;
        allUsers.update(newUserID);
      }

    });

    // let dbUser = pericoresiApp.database().ref('users/' + key);
    // let dbMessages = pericoresiApp.database().ref('messages');
    // let updateUser = this.getCurrentUser();
    // let updateMessages = [];
    //
    // dbMessages.orderByChild('sentUser').equalTo(updateUser.displayName).on('value', function(snapshot) {
    //   updateMessages = snapshot.val();
    // });
    //
    // updateUser.displayName = newUsername;
    // dbUser.update(updateUser);
    //
    // for (var uKey in updateMessages) {
    //   if (updateMessages.hasOwnProperty(uKey)) {
    //     dbMessages = pericoresiApp.database().ref('messages/' + uKey);
    //     updateMessages[uKey].sentUser = newUsername;
    //     updateMessages[uKey].id = uKey;
    //     dbMessages.update(updateMessages[uKey]);
    //   }
    // }
  }

  // Change user photo and update database
  changePhotoURL(key, newPhotoURL) {
    let dbUser = pericoresiApp.database().ref('users/' + key);
    let dbMessages = pericoresiApp.database().ref('messages');
    let updateUser = this.getCurrentUser();
    let updateMessages = [];

    dbMessages.orderByChild('imageURL').equalTo(updateUser.photoURL).on('value', function(snapshot) {
      updateMessages = snapshot.val();
      console.log(snapshot.val());
    });

    updateUser.photoURL = newPhotoURL;
    dbUser.update(updateUser);

    console.log(updateUser);
    console.log(updateMessages);
    for (var uKey in updateMessages) {
      if (updateMessages.hasOwnProperty(uKey)) {
        dbMessages = pericoresiApp.database().ref('messages/' + uKey);
        updateMessages[uKey].imageURL = newPhotoURL;
        let updateID = {};
        updateID['/' + updateMessages[uKey].id] = updateMessages[uKey].id
        dbMessages.update(updateID);
      }
    }
  }

  // Remove message from database
  removeMessage(key) {
    let dbMessages = pericoresiApp.database().ref('messages/' + key);
    dbMessages.remove();
  }

  render() {
    const { messages } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <MessageContainer messages={messages} removeMessage={this.removeMessage} getCurrentUser={this.getCurrentUser}/>
            <AddMessageForm getCurrentUser={this.getCurrentUser} addMessage={this.addMessage} changeUsername={this.changeUsername} />
            <Route path="/login" component={Login} getCurrentUser={this.getCurrentUser} />
            <Route path="/userinfo" render={(props) => <UserInfo getCurrentUser={this.getCurrentUser} changeUsername={this.changeUsername} changePhotoURL={this.changePhotoURL}/>} />
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

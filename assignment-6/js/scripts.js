var messages = [];

var autoMessages = ["Hello",
    "I really like cheese.",
    "What kind of cheese do you like?",
    "Really?  Thats fascinating!",
    "Tell me more about cheese.  I really like it.",
    "Cheese that is.",
    "Did you know we have a lot of cheese in Wisconsin?",
    "Are you from Wisconsin?",
    "Really?  Me too!",
    "Man, cheese is great.",
    "I'd love some cheese right now."];

var autoCount = 0;

function Message(type, user, text) {
    this.type = type;
    this.user = user;
    this.text = text;
}

function addMessage(event) {
  var user, type, className;
  var messageInput = document.getElementById('message-input');
  var messagesContainerEl = document.getElementById('message-container');
  var userName = document.getElementById('user-name').value;
  if (userName == "") {
      userName = "Anonymous";
  }

  switch (event.target.id) {
    case 'send-button':
      user = userName;
      type = 'out';
      className = 'out-message';
      break;
    case 'reply-button':
      user = userName;
      type = 'in';
      className = 'in-message';
      break;
    default:
      user = 'unknown';
      type = 'error';
      className = 'error-message';
  }
  console.log(type);

  //Create new message.
  if (messageInput.value != '') {
    //Construct message and add to collection
    var message = new Message(type, user, messageInput.value);
    messages.push(message);

    //create element
    var messageText = document.createTextNode(message.user + ": " + message.text);
    var messageSpanEl = document.createElement('span');
    var messageDivEl = document.createElement('div');

    messageSpanEl.appendChild(messageText);
    messageDivEl.appendChild(messageSpanEl);
    messageDivEl.className = className;

    // Add to DOM.
    messagesContainerEl.appendChild(messageDivEl);

    //Scroll to bottom.
    messagesContainerEl.scrollTop = messagesContainerEl.scrollHeight;
  }
}

function autoReply() {
  if (autoCount >= autoMessages.length){
    autoCount = 0;
  }
  var message = new Message('in', 'Auto-Bot', autoMessages[autoCount]);
  messages.push(message);
  autoCount++;

  var messagesContainerEl = document.getElementById('message-container');
  var messageText = document.createTextNode(message.user + ": " + message.text);
  var messageSpanEl = document.createElement('span');
  var messageDivEl = document.createElement('div');

  messageSpanEl.appendChild(messageText);
  messageDivEl.appendChild(messageSpanEl);
  messageDivEl.className = 'in-message';

  messagesContainerEl.appendChild(messageDivEl);
  messagesContainerEl.scrollTop = messagesContainerEl.scrollHeight;
}

var init = function() {
  // Wire event handlers
  document.getElementById('send-button').onclick = addMessage;
  document.getElementById('reply-button').onclick = addMessage;
  document.getElementById('message-input')
      .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById('send-button').click();
          document.getElementById('message-input').value = "";
      }
  });
  autoReply();
}

init();
setInterval(autoReply, 3000);

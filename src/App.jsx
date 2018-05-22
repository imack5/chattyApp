// Main source for mounting to the react DOM.
// All components are mounted through here.

import React, { Component } from "react";
import Chatbar from "./ChatBar.jsx";
import MyNavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import MyModal from "./MyModal.jsx";
import Modal from "react-bootstrap/lib/Modal";
import fetch from "node-fetch";
import querystring from "querystring";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userColour: "",
      tempUser: { name: "" },
      currentUser: { name: "" },
      prevUser: { name: "" },
      currentId: 4,
      currentText: "",
      usersConnected: "0",
      messages: [],
      navBarStyle: { color: "black" }
    };
  }

  //Handles Edits of the username
  _handleEdit = ev => {
    const name = ev.target.value;
    this.setState({ tempUser: { name: name } });
  };

  //Handles submissions of the initial username
  _handleNameSubmit = ev => {
    const name = this.state.tempUser.name;
    this.setState({ currentUser: { name: name }, prevUser: { name: name } });
    this.socket = new WebSocket("ws://localhost:3001");
  };

  //Handles input into the text field
  _handleContentInput = ev => {
    const content = ev.target.value;
    this.setState({ currentText: content });
  };

  //Handles input into the username field
  _handleNameInput = ev => {
    const user = this.state.currentUser.name;
    const name = ev.target.value;
    this.setState({ currentUser: { name: name } });
  };

  //Handles when the enter button is pressed
  _handleEnter = ev => {
    if (ev.key === "Enter" && this.state.currentText !== "") {
      const currentUser = this.state.currentUser.name;
      const prevUser = this.state.prevUser.name;

      //Check to see if the user is changed when message submitted
      if (currentUser !== prevUser) {
        const newNotification = {
          type: "postNotification",
          content: `${prevUser} changed their name to ${currentUser}`
        };
        this.socket.send(JSON.stringify(newNotification));
      }

      this.setState({ prevUser: { name: this.state.currentUser.name } });

      const newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: this.state.currentText,
        colour: this.state.userColour
      };

      //Checks to see if the \giphy keyword is present in the message,
      //and if so replace it with the image URL from the giphy API
      let giphyRegEx = /\\giphy\s(\w+)\b/;
      const giphySearch = (newMessage.content || "").match(giphyRegEx);

      if (giphySearch !== null) {
        let qs = querystring.stringify({
          api_key: "ZVGiSiaCDQLOljWqYDof16sq6Gy6xSXY",
          tag: giphySearch[1]
        });

        //GET request to Giphy API
        fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
          .then(response => {
            return response.json();
          })
          .then(json => {
            let newGiphy = [
              <img className="picture" src={json.data.image_url} />
            ];

            let newString = newMessage.content.replace(
              `${giphySearch[0]}`,
              `${json.data.image_url}`
            );

            newMessage.content = newString;
          })
          .then(() => {
            this.socket.send(JSON.stringify(newMessage));

            this.setState({ currentText: "" });
          });
      } else {
        this.socket.send(JSON.stringify(newMessage));
        this.setState({ currentText: "" });
      }
    }
  };

  componentDidUpdate() {
    if (this.socket) {
      const newMessage = {
        type: "userJoin",
        content: `${this.state.currentUser.name} joined the chat!`
      };

      //When a user joins, send notification to the chat
      this.socket.onopen = function(event) {
        this.send(JSON.stringify(newMessage));
      };

      //On message from the server, send it to the chat
      this.socket.onmessage = event => {
        const incomingMessage = JSON.parse(event.data);
        const newMessages = this.state.messages.concat([incomingMessage]);

        if (incomingMessage.type === "colourSet") {
          this.setState({ userColour: incomingMessage.colour });
        }

        if (incomingMessage.type === "userJoin") {
          this.setState({ usersConnected: incomingMessage.size });
        }
        this.setState({ messages: newMessages });
      };
    }
  }

  render() {
    return (
      <div onKeyPress={this._handleEnter}>
        <MyModal
          handleSubmit={this._handleNameSubmit}
          handleEdit={this._handleEdit}
        />
        <MyNavBar
          style={{ color: "black" }}
          usersConnected={this.state.usersConnected}
        />
        <MessageList
          messages={this.state.messages}
          currentUser={this.state.currentUser}
        />
        <Chatbar
          currentUser={this.state.currentUser}
          currentText={this.state.currentText}
          handleContentInput={this._handleContentInput}
          handleNameInput={this._handleNameInput}
        />
      </div>
    );
  }
}

export default App;

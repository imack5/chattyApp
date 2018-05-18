import React, { Component } from "react";
import Chatbar from "./ChatBar.jsx";
import MyNavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import Example from "./Example.jsx";
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
      // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }
  _handleEdit = ev => {
    const name = ev.target.value;
    this.setState({ tempUser: { name: name } });
  };

  _handleNameSubmit = ev => {
    const name = this.state.tempUser.name;
    this.setState({ currentUser: { name: name }, prevUser: { name: name } });
    this.socket = new WebSocket("ws://localhost:3001");
  };

  _handleContentInput = ev => {
    const user = this.state.currentUser.name;
    const content = ev.target.value;
    this.setState({ currentText: content });
  };

  _handleNameInput = ev => {
    const user = this.state.currentUser.name;
    const name = ev.target.value;
    this.setState({ currentUser: { name: name } });
  };

  _handleEnter = ev => {
    if (ev.key === "Enter") {
      const currentUser = this.state.currentUser.name;
      const prevUser = this.state.prevUser.name;

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

      console.log("enter was pressed");

      let giphyRegEx = /\\giphy\s(\w+)\b/;
      const giphySearch = (newMessage.content || "").match(giphyRegEx);

      if (giphySearch !== null) {
        console.log("whoah it matched", giphySearch);

        let qs = querystring.stringify({
          api_key: "ZVGiSiaCDQLOljWqYDof16sq6Gy6xSXY",
          tag: giphySearch[1]
        });

        fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
          .then(response => {
            console.log(response);
            return response.json();
          })
          .then(json => {
            console.log(json);
            let newGiphy = [
              <img className="picture" src={json.data.image_url} />
            ];
            console.log("newMessage", newMessage.content, giphySearch[0]);
            console.log(newMessage.content == `${giphySearch[0]}`);
            let newString = newMessage.content.replace(
              `${giphySearch[0]}`,
              `${json.data.image_url}`
            );
            newMessage.content = newString;

            console.log("newMessage", newMessage, newString);
          })
          .then(() => {
            this.socket.send(JSON.stringify(newMessage));
            console.log("sending message");
            this.setState({ currentText: "" });
          });
      } else {
        this.socket.send(JSON.stringify(newMessage));
        console.log("sending message");
        this.setState({ currentText: "" });
      }
    }
  };

  componentDidUpdate(){
    if (this.socket) {
      console.log("componentDidMount <App />");

      const newMessage = {
        type: "userJoin",
        content: `${this.state.currentUser.name} joined the chat!`
      };

      this.socket.onopen = function(event) {
        this.send(JSON.stringify(newMessage));
        //this.console.log("connected to socket", event);
      };

      this.socket.onmessage = event => {
        const incomingMessage = JSON.parse(event.data);
        const newMessages = this.state.messages.concat([incomingMessage]);

        if (incomingMessage.type === "colourSet") {
          console.log("set Colour woooo");
          this.setState({ userColour: incomingMessage.colour });
          console.log(incomingMessage);
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
        <Example
          handleSubmit={this._handleNameSubmit}
          handleEdit={this._handleEdit}
        />
        <MyNavBar usersConnected={this.state.usersConnected} />
        <MessageList messages={this.state.messages} />
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

import React, { Component } from "react";
import Chatbar from "./ChatBar.jsx";
import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userColour: "",
      currentUser: { name: "Bob" },
      prevUser: { name: "Bob" },
      currentId: 4,
      currentText: "",
      usersConnected: "0",
      // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

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

      this.socket.send(JSON.stringify(newMessage));

      this.setState({ currentText: "" });
    }
  };

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://172.46.2.228:3001");

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

      if (incomingMessage.type === "colourSet"){
        console.log("set Colour woooo")
        this.setState({userColour: incomingMessage.colour})
        console.log(incomingMessage)
      }

      if (incomingMessage.type === "userJoin") {
        this.setState({ usersConnected: incomingMessage.size });
      }
      this.setState({ messages: newMessages });
    };
  }

  render() {
    return (
      <div onKeyPress={this._handleEnter}>
        <NavBar usersConnected={this.state.usersConnected} />
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

import React, { Component } from "react";
import Chatbar from "./ChatBar.jsx";
import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Bob" },
      prevUser: { name: "Bob" },
      currentId: 4,
      currentText: "",
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
        }
        this.socket.send(JSON.stringify(newNotification));
      }

      this.setState({ prevUser: { name: this.state.currentUser.name } });

      const newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: this.state.currentText
      };

      console.log("enter was pressed");

      this.socket.send(JSON.stringify( newMessage));

      this.setState({ currentText: "" });
    }
  };

  //   componentDidMount(){
  //   // this is an "echo" websocket service
  //   this.connection = new WebSocket('wss://echo.websocket.org');
  //   // listen to onmessage event
  //   this.connection.onmessage = evt => {
  //     // add the new message to state
  //     this.setState({
  //       messages : this.state.messages.concat([ evt.data ])
  //     })
  //   };

  //   // for testing purposes: sending to the echo service which will send it back back
  //   setInterval( _ =>{
  //     this.connection.send( Math.random() )
  //   }, 2000 )
  // },

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://172.46.2.228:3001");

    this.socket.onopen = function(event) {
      //this.socket.send("Hello");
      console.log("connected to socket", event);
    };

    this.socket.onmessage = event => {


      const newMessages = this.state.messages.concat([JSON.parse(event.data)]);
      console.log(newMessages)
      this.setState({ messages: newMessages });
    };
  }

  render() {
    return (
      <div onKeyPress={this._handleEnter}>
        <NavBar />
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

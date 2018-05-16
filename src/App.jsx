import React, {Component} from 'react';
import  Chatbar  from './ChatBar.jsx'
import  NavBar  from './NavBar.jsx'
import  MessageList  from './MessageList.jsx'

class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
          currentUser: {name: "Bob"},
          currentId: 4,
          currentText: '',
           // optional. if currentUser is not defined, it means the user is Anonymous
          messages: []
        }

    }

    _handleInput = (ev) => {
      const user = this.state.currentUser.name;
      const content = ev.target.value;
      this.setState({currentText: content})

    }

    _handleEnter = (ev) => {

      if(ev.key === 'Enter'){
         const newMessage = {
            username: this.state.currentUser.name,
            content: this.state.currentText
          }

          console.log("enter was pressed")
          const {username, content} = newMessage;

          this.socket.send(JSON.stringify({username, content}));

          this.setState({ currentText: ''})
      }

    }

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

      this.socket = new WebSocket("ws://localhost:3001");

      this.socket.onopen = function (event) {
        //this.socket.send("Hello");
        console.log("connected to socket", event)
      }

      this.socket.onmessage = (event) => {

        console.log("event", event)
        const newMessages = this.state.messages.concat([JSON.parse(event.data)]);
        console.log("New messages", newMessages)
        this.setState({messages: newMessages})

      }

      setTimeout(() => {
        console.log("Simulating incoming message");
        // Add a new message to the list of messages in the data store
        const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
        const messages = this.state.messages.concat(newMessage)
        // Update the state of the app component.
        // Calling setState will trigger a call to render() in App and all child components.
        this.setState({messages: messages})
      }, 3000);


    }

  render() {
    return (
      <div onKeyPress={this._handleEnter}>
        <NavBar />
        <MessageList messages={ this.state.messages } />
        <Chatbar currentUser={ this.state.currentUser } currentText={this.state.currentText} handleInput={this._handleInput} />
      </div>

    );
  }
}
export default App;

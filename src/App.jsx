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
          messages: [
            {
              id: 1,
              username: "Bob",
              content: "Has anyone seen my marbles?",
            },
            {
              id: 2,
              username: "Anonymous",
              content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
            }
          ]}

    }

    _handleInput = (ev) => {
      const user = this.state.currentUser.name;
      const content = ev.target.value;
      this.setState({currentText: content})

    }

    _handleEnter = (ev) => {

      if(ev.key === 'Enter'){
         const newMessage = {
            id: this.state.currentId.toString(),
            username: this.state.currentUser.name,
            content: this.state.currentText
          }

          const oldMessages = this.state.messages;
          oldMessages.push(newMessage);
          const newID = this.state.currentId + 1;

          this.setState({messages: [...oldMessages], currentId: newID, currentText: ''})
      }

    }

    componentDidMount() {
      console.log("componentDidMount <App />");
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

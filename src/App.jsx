import React, {Component} from 'react';
import  Chatbar  from './ChatBar.jsx'
import  NavBar  from './NavBar.jsx'
import  MessageList  from './MessageList.jsx'

class App extends Component {

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList />
        <Chatbar />
      </div>

    );
  }
}
export default App;

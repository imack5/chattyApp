import React, {Component} from 'react';

class Message extends Component {
  render(){
    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.user}</span>
          <span className="message-content">{this.props.text}</span>
        </div>
      </div>
    )
  }

}

export default Message;


import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    const sup = this.props.messages.map(message => (
      <Message
        key={message.id}
        type={message.type}
        user={message.username}
        text={message.content}
        colour={message.colour}
      />
    ));

    return <main className="messages">{sup}</main>;
  }
}

export default MessageList;

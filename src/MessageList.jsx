import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  _scrollToImage(event) {
    event.target.scrollIntoView({ behavior: "smooth" });
  }

  _scrollToMessage() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    this._scrollToMessage();
  }

  render() {
    const sup = this.props.messages.map(message => (
      <Message
        key={message.id}
        type={message.type}
        user={message.username}
        text={message.content}
        colour={message.colour}
        handleLoad={this._scrollToImage}
        currentUser={this.props.currentUser}
      />
    ));

    return (
      <div>
        <main className="messages">{sup}</main>
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.el = el;
          }}
        />
      </div>
    );
  }
}

export default MessageList;

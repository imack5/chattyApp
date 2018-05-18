import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {

  _scrollToImage(event) {
    console.log(event)
    event.target.scrollIntoView({ behavior: "smooth" });
  }

  _scrollToMessage() {
    console.log(event)
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    console.log("it mounted");
  }

  componentDidUpdate() {
    console.log("it updated");
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
      />
    ));

    return (

      <div>
        <main className="messages">{sup}</main>;
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.el = el;
          }}
        ></div>
      </div>
    )
  }
}

export default MessageList;

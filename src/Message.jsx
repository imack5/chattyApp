import React, { Component } from "react";

class Message extends Component {
  render() {
    let usernameStyle = {
      color: this.props.colour
    };

    const linkParser = /\bhttps?\S*/;
    let imageURL = "";
    let messageContent = this.props.text;

    const picLink = linkParser.exec(this.props.text);

    if (picLink !== null) {
      imageURL = <img className="picture" src={picLink[0]} />;
      messageContent = messageContent.replace(picLink[0], "");
    }

    if (this.props.type === "incomingMessage") {
      return (
        <div>
          <div className="message">
            <span style={usernameStyle} className="message-username">
              {this.props.user}
            </span>
            <span className="message-content">
              {messageContent}
              {imageURL}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="notification">
          <span className="notification-content">{messageContent}</span>
        </div>
      );
    }
  }
}

export default Message;

import React, { Component } from "react";

class Message extends Component {
  render() {
    // const divStyle = {
    //   color: this.props.colour
    // };

    if (this.props.type === "incomingMessage") {
      return (
        <div>
          <div className="message">
            <span
              style={{
                color: this.props.colour
              }}
              className="message-username"
            >
              {this.props.user}
            </span>
            <span className="message-content">{this.props.text}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="notification">
          <span className="notification-content">{this.props.text}</span>
        </div>
      );
    }
  }
}

export default Message;

import React, { Component } from "react";
import fetch from "node-fetch";
import querystring from "querystring";
import Image from "react-bootstrap/lib/Image";
import Panel from "react-bootstrap/lib/Panel";
import picUrlReplace from "./helperFuncs/picUrlReplace.jsx";
import uuidv4 from "uuid/v4";

//Where the messages are stored
class Message extends Component {
  constructor() {
    super();

    this.state = {
      messageContent: []
    };
  }

  componentWillMount() {
    //Replaces any image urls with an <img> and returns the rest of the message in a <div>
    let urlImages = picUrlReplace(this.props.text, this.props.handleLoad);

    this.setState({
      messageContent: this.state.messageContent.concat(urlImages)
    });

    let order = ["orderOne", "orderTwo", "orderThree"];
    let userMessage = "userMessage";

    if (this.props.currentUser.name !== this.props.user) {
      order = ["orderThree", "orderOne", "orderTwo"];
      userMessage = "";
    }

    this.setState({ order: order, userMessage: userMessage });
  }
  render() {
    let usernameStyle = {
      color: this.props.colour
    };

    if (this.props.type === "incomingMessage") {
      return (
        <div className="message">
          <div className={`message-spacing ${this.state.order[0]}`}> </div>
          <div
            style={usernameStyle}
            className={`message-username ${this.state.order[1]}`}
          >
            {this.props.user}
          </div>
          <div className={`message-content ${this.state.order[2]}`}>
            <Panel className={`${this.state.userMessage}`}>
              <Panel.Body>
                <span className="messageArea">{this.state.messageContent}</span>
              </Panel.Body>
            </Panel>
          </div>
        </div>
      );
    } else {
      return (
        <div className="notification">
          <div className="notification-content">
            {this.state.messageContent}
          </div>
        </div>
      );
    }
  }
}

export default Message;

import React, { Component } from "react";
import fetch from "node-fetch";
import querystring from "querystring";
import Image from "react-bootstrap/lib/Image";
import Panel from "react-bootstrap/lib/Panel";

//Where the messages are stored
class Message extends Component {
  constructor() {
    super();

    this.state = {
      messageContent: "",
      picContent: []
    };
  }

  componentWillMount() {
    let picRegEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    let imageURL = "";

    this.setState({ messageContent: this.props.text });

    const picLink = (this.props.text || "").match(picRegEx);

    if (picLink !== null) {
      let urlImages = picLink.map(imageLink => {
        imageURL = (
          <Image
            className="picture"
            onLoad={this.props.handleLoad}
            src={imageLink}
            rounded
          />
        );
        this.setState({
          messageContent: this.state.messageContent.replace(imageLink, "")
        });
        return imageURL;
      });

      this.setState({ picContent: this.state.picContent.concat(urlImages) });
    }

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
                <span className="messageArea">
                  {this.state.messageContent}
                  {this.state.picContent}
                </span>
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

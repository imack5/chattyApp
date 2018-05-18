import React, { Component } from "react";
import fetch from "node-fetch";
import querystring from "querystring";

class Message extends Component {

  constructor(){
    super();

    this.state = {
      messageContent: "",
      picContent: []
    }
  }

  componentWillMount(){
    let picRegEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

    let imageURL = "";

    this.setState({messageContent: this.props.text});

    const picLink = (this.props.text || "").match(picRegEx);


    if (picLink !== null) {
      let urlImages = picLink.map(imageLink => {
        imageURL = <img className="picture" onLoad={this.props.handleLoad} src={imageLink} />;
        this.setState({messageContent: this.state.messageContent.replace(imageLink, "")});
        return imageURL;
      });

      this.setState({picContent: this.state.picContent.concat(urlImages)});
    }

  }
  render() {
    let usernameStyle = {
      color: this.props.colour
    };



    if (this.props.type === "incomingMessage") {
      return (
        <div>
          <div className="message">
            <span style={usernameStyle} className="message-username">
              {this.props.user}
            </span>
            <span className="message-content">
              {this.state.messageContent}
              {this.state.picContent}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="notification">
          <span className="notification-content">{this.state.messageContent}</span>
        </div>
      );
    }
  }
}

export default Message;

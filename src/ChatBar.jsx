import React, { Component } from "react";
import ReactDOM from "react-dom";

class Chatbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      intialFocus: false,
      messageComponent: ""
    };
  }

  //Focus input on chatbar
  focusInput() {
    if (this.state.messageComponent) {
      ReactDOM.findDOMNode(this.state.messageComponent).focus();
    }
  }

  //Setting the state of the message component
  _setMessageComponent = component => {
    if (component) {
      this.setState({ messageComponent: component });
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={this.props.currentUser.name}
          onChange={this.props.handleNameInput}
          value={this.props.currentUser.name}
        />
        <input
          className="chatbar-message"
          onChange={this.props.handleContentInput}
          value={this.props.currentText}
          placeholder="Type a message and hit ENTER"
          ref={this._setMessageComponent}
        />
      </footer>
    );
  }
}

export default Chatbar;

import React, { Component } from "react";
import Navbar from "react-bootstrap/lib/Navbar";

class MyNavBar extends Component {
  render() {
    return (
      <Navbar className="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <div style={{ color: "white" }}>Chatty</div>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text pullRight className="navbar-counter">
            <div style={{ color: "white" }}>
              Users Connected: {this.props.usersConnected}
            </div>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MyNavBar;

import React, { Component } from "react";
import Navbar from "react-bootstrap/lib/Navbar";

class MyNavBar extends Component {
  render() {
    return (

      <Navbar className="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Chatty</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text pullRight className="navbar-counter">
           Users Connected: {this.props.usersConnected}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MyNavBar;

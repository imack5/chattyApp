import React, { Component } from "react";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Button from "react-bootstrap/lib/Button";
import ReactDOM from "react-dom";

class MyForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ""
    };
  }

  focusInput(component) {
    if (component) {
      ReactDOM.findDOMNode(component).focus();
    }
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 2) return "success";
    else if (length > 0) return "error";
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.handleEdit(e);
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Please Enter a Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
            ref={this.focusInput}
          />
          <FormControl.Feedback />
          <HelpBlock>Username must atleast 3 characters long</HelpBlock>
        </FormGroup>
      </form>
    );
  }
}

export default MyForm;

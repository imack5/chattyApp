import React, { Component } from "react";
import Modal from "react-bootstrap/lib/Modal";
import Popover from "react-bootstrap/lib/Popover";
import Tooltip from "react-bootstrap/lib/Tooltip";
import Button from "react-bootstrap/lib/Button";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import MyForm from "./MyForm.jsx";

//Modal to enter to username
class MyModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: true
    };
  }

  handleClose() {
    this.setState({ show: false });
    this.props.handleSubmit();
  }

  _handleEnterPress = ev => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      this.handleClose();
    }
  };

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );

    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <div>
        <Modal onKeyPress={this._handleEnterPress} show={this.state.show}>
          <MyForm handleEdit={this.props.handleEdit} />
          <Modal.Footer>
            <Button onClick={this.handleClose}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default MyModal;

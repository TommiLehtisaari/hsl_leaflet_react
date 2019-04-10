import React, { Component } from "react";
import { subscribeTransport } from "../utils/mqttHandler";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    subscribeTransport(this.props.mqtt, this.state.value);
    this.setState({ value: "" });
    event.preventDefault();
  }

  state = {};
  render() {
    return (
      <div className="container">
        <div className="input-group m-3">
          <input
            onChange={this.handleChange}
            value={this.state.value}
            className="form-control"
            placeholder="Transport line number"
            type="text"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              onClick={this.handleSubmit}
            >
              Subscribe GPS
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Controls;

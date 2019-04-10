import React, { Component } from "react";
import { connect } from "mqtt";
import Map from "./components/map";
import Controls from "./components/controls";
import "./App.css";

const mqtt_client = connect("mqtts://mqtt.hsl.fi:443");
//mqtt_client.subscribe("/hfp/v1/journey/ongoing/+/+/+/1020/+/+/+/+/+/#");

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Controls mqtt={mqtt_client} />
          <Map mqtt={mqtt_client} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;

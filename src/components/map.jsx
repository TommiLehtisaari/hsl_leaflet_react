import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

class Map extends Component {
  componentDidMount() {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    this.map = L.map("map", {
      center: [60.2, 24.95],
      zoom: 11,
      zoomControl: false
    });

    L.tileLayer(
      "https://cdn.digitransit.fi/map/v1/hsl-map-256/{z}/{x}/{y}.png",
      {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      }
    ).addTo(this.map);

    this.props.mqtt.on("message", (topic, message) => {
      const vehicle_position = JSON.parse(message).VP;
      if (vehicle_position.lat == null || vehicle_position.long == null) return;
      this.map.eachLayer(layer => {
        if (layer.options.veh === vehicle_position.veh) {
          layer.setLatLng([vehicle_position.lat, vehicle_position.long]);
          //layer.options = vehicle_position;
          return;
        }
      });
      var myIcon = L.divIcon({ className: "fa fa-bus fs-2x" });
      vehicle_position.icon = myIcon;
      L.marker(
        [vehicle_position.lat, vehicle_position.long],
        vehicle_position
      ).addTo(this.map);
    });
  }

  render() {
    return (
      <Wrapper className="container" height="45em" width="2.75em" id="map" />
    );
  }
}

export default Map;

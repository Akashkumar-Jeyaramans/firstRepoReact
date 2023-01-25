import { Card } from "antd";
import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
// });

// L.Marker.prototype.options.icon = DefaultIcon;

const blackOptions = { color: "black" };
const polyline = [
  [13.005321507296706, 77.66291562524158],
  [13.0035803427624, 77.63269699764848],
];

const MapOverview = () => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetinaUrl,
      iconUrl: icon,
      shadowUrl: iconShadow,
    });
  }, []);
  return (
    <Card>
      <MapContainer
        center={[13.005321507296706, 77.66291562524158]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Mapbox streets map">
            {/* <TileLayer
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
              url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
              maxZoom={18}
              id="mapbox/streets-v11"
              tileSize={512}
              zoomOffset={-1}
              accessToken="pk.eyJ1Ijoic3dhcmFqYXRvcCIsImEiOiJja3d5ZjlicjcwbjE0Mm9sYzg4cWJiMXp1In0.0m5Dwq8GOPEgw4yPHcFuBw"
            /> */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={18}
              minZoom={2}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={18}
              minZoom={2}
            />
          </LayersControl.BaseLayer>
          <Marker position={[13.005321507296706, 77.66291562524158]}>
            <Popup>
              Atech Solutions Private Limited <br /> No. 3M, 217, East of NGEF
              Layout, Kasturi Nagar, Bengaluru, Karnataka 560043.
            </Popup>
          </Marker>
          <Marker position={[13.0035803427624, 77.63269699764848]}>
            <Popup>
              Atech Solutions Private Limited <br /> No. 3M, 217, East of NGEF
              Layout, Kasturi Nagar, Bengaluru, Karnataka 560043.
            </Popup>
          </Marker>
          <Polyline pathOptions={blackOptions} positions={polyline} />
        </LayersControl>
      </MapContainer>
    </Card>
  );
};

export default MapOverview;

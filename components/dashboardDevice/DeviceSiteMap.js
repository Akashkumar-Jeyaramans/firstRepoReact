import { Card, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";

const { Title } = Typography;

const DeviceSiteMap = (props) => {
  const { siteLng, siteLat } = props;
  const [position, setPosition] = useState(null);
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetinaUrl,
      iconUrl: icon,
      shadowUrl: iconShadow,
    });
  }, []);

  useEffect(() => {
    setPosition({ lat: siteLat, lng: siteLng });
  }, [siteLng, siteLat]);

  const LocationMarker = () => {
    const map = useMapEvents({});
    map.flyTo(position, 2);
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  const GeoLocation = () => (
    <Space>
      <Title level={5}>Geo-Location:</Title>
      <Title level={5}>{`Lat: ${siteLat}`}</Title>
      <Title level={5}>{`Long: ${siteLng}`}</Title>
    </Space>
  );

  return (
    <Card
      actions={[<GeoLocation />]}
      bodyStyle={{ paddingTop: 0 }}
      headStyle={{ borderBottom: "none" }}
      bordered={false}
    >
      <MapContainer
        center={[siteLat, siteLng]}
        zoom={2}
        scrollWheelZoom={false}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Mapbox streets map">
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
          <LocationMarker />
        </LayersControl>
      </MapContainer>
    </Card>
  );
};

export default DeviceSiteMap;

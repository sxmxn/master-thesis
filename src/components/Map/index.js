import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

const Map = ({ mapHeight = 300 }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      style={{ height: mapHeight, borderRadius: 8 }}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

Map.propTypes = {
  mapHeight: PropTypes.number,
};

export default Map;

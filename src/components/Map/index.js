import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import L from 'leaflet';
import styled from 'styled-components';

const StyledMapContainer = styled(MapContainer)`
  .leaflet-top {
    bottom: 10px;
    top: unset;
  }
`;

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CENTER_DEFAULT = [52.5317, 13.3817];

const Map = ({ mapHeight = 300, mapData }) => {
  return (
    <StyledMapContainer
      center={
        mapData
          ? [
              mapData.features[0]?.geometry?.coordinates[1],
              mapData.features[0]?.geometry?.coordinates[0],
            ]
          : CENTER_DEFAULT
      }
      style={{ height: mapHeight, borderRadius: 8 }}
      zoom={7}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
      />
      {!!mapData && <GeoJSON key="test" data={mapData} />}
    </StyledMapContainer>
  );
};

Map.propTypes = {
  mapHeight: PropTypes.number,
  mapData: PropTypes.object,
};

export default Map;

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  FeatureGroup,
  Popup,
} from 'react-leaflet';
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
  iconRetinaUrl: require('assets/pin.png'),
  iconUrl: require('assets/pin.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CENTER_DEFAULT = [52.5317, 13.3817];

const Map = ({ mapHeight = 300, mapData, geoJson = true }) => {
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
      {!!mapData && geoJson ? (
        <GeoJSON key="test" data={mapData} style={{ color: '#457B9D' }} />
      ) : (
        mapData.features.map((feature, index) => {
          return (
            <FeatureGroup color="purple" key={index}>
              <Popup>
                <p>{feature.properties.tour}</p>
                <button
                  id="button"
                  className="btn btn-primary"
                  onClick={e => {
                    console.log(feature.properties.tourId);
                  }}
                >
                  More Info
                </button>
              </Popup>
              <Marker
                position={[
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ]}
              />
            </FeatureGroup>
          );
        })
      )}
    </StyledMapContainer>
  );
};

Map.propTypes = {
  mapHeight: PropTypes.number,
  mapData: PropTypes.object,
  geoJson: PropTypes.bool,
};

export default Map;

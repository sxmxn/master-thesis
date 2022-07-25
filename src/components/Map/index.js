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
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const StyledMapContainer = styled(MapContainer)`
  .leaflet-top {
    bottom: 10px;
    top: unset;
  }
`;

const PopUpTitle = styled(Typography)`
  margin-bottom: 8px !important;
  font-weight: 700 !important;
`;

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('assets/pin.png'),
  iconUrl: require('assets/pin.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CENTER_DEFAULT = [52.5317, 13.3817];

const Map = ({ mapHeight = 300, mapData, liveMap = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
      />
      {!!mapData && !liveMap ? (
        <GeoJSON key="test" data={mapData} style={{ color: '#457B9D' }} />
      ) : (
        !!mapData &&
        mapData.features.map((feature, index) => {
          return (
            <FeatureGroup color="purple" key={index}>
              <Popup>
                <PopUpTitle>{feature.properties.tour}</PopUpTitle>
                <Button
                  variant="contained"
                  onClick={e => {
                    navigate(`../${feature.properties.tourId}`);
                  }}
                >
                  {t('more-info')}
                </Button>
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

import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle } from '@styled-icons/bootstrap/CheckCircle';
import { ExclamationTriangle } from '@styled-icons/bootstrap/ExclamationTriangle';
import styled from 'styled-components';
import { Typography, Box } from '@mui/material';
import Card from 'components/Structure/Card';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
  width: 100%;
`;

const Feedback = ({ rating, text, textDe }) => {
  const { i18n } = useTranslation();

  const getTextCurrentLang = () => {
    if (!textDe) return text;

    if (i18n.language === 'en') {
      return text;
    } else {
      return textDe;
    }
  };

  return (
    <Card
      flexDirection="column"
      alignItems="start"
      justifyContent="flex-start"
      width={400}
      height="100%"
    >
      <Typography fontWeight={500} mb={4} color="#fff">
        Feedback
      </Typography>
      <Container>
        <Box>{getIcon(rating)}</Box>
        <Typography ml={2}>{getTextCurrentLang()}</Typography>
      </Container>
    </Card>
  );
};

Feedback.propTypes = {
  rating: PropTypes.oneOf(['GOOD', 'BAD']).isRequired,
  text: PropTypes.string.isRequired,
  textDe: PropTypes.string,
};

export default Feedback;

const getIcon = rating => {
  return {
    GOOD: <CheckCircle size={25} />,
    BAD: <ExclamationTriangle size={25} />,
  }[rating];
};

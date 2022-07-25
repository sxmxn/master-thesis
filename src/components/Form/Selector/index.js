import * as React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  InputLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Container = styled(Box)`
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & .MuiSvgIcon-root {
    color: #fff;
    opacity: 0.6;
  }

  & .MuiInputLabel-root {
    color: #fff;
    opacity: 0.6;
  }

  & .MuiSelect-select {
    color: #fff;
  }

  & .MuiInputLabel-root.Mui-focused {
    display: none;
  }
`;

const Selector = ({ onSelect, items, selected, placeholder, description }) => {
  const { palette } = useTheme();
  const { t } = useTranslation();

  const handleChange = event => {
    onSelect(event.target.value);
  };

  return (
    <Container
      display="flex"
      sx={{
        height: 60,
        maxWidth: 400,
        background: palette.primary.main,
        padding: '12px',
        borderRadius: '8px',
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography color="#fff" fontWeight={500} ml={1}>
        {description}
      </Typography>
      <FormControl sx={{ minWidth: 130 }}>
        {!selected && <InputLabel id="select-label">{placeholder}</InputLabel>}
        <Select
          variant="outlined"
          labelId="select-label"
          id="select"
          value={selected}
          onChange={handleChange}
          label={placeholder}
        >
          <MenuItem value="">
            <em>{t('deselect')}</em>
          </MenuItem>
          {items.map(item => (
            <MenuItem key={item?.value} value={item?.value}>
              {item?.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

Selector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  placeholder: PropTypes.string,
  description: PropTypes.string.isRequired,
};

export default Selector;

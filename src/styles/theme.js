import { createGlobalStyle } from 'styled-components';
import { createTheme } from '@mui/material/styles';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif !important;
    color: #FFFFFF;
  }
  
  html {
    font-size: 100%;
  }

  h1, h2, h3, h4, h5 {
    font-weight: 700;
  }

  h1 {
    font-weight: 500;
    font-size: 4rem;
  }

  h2 {
    font-size: 1.7rem;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 1.2rem;
  }
`;

export const gridTheme = {
  gridColumns: 24, // default 12
  breakpoints: {
    // defaults below
    xxl: 1440,
    xl: 1200,
    lg: 992,
    md: 768,
    sm: 576,
    xs: 575,
  },
  row: {
    padding: 10, // default 15
  },
  col: {
    padding: 5, // default 15
  },
  container: {
    padding: 0, // default 15
    maxWidth: {
      // defaults below
      xxl: 1141,
      xl: 1140,
      lg: 960,
      md: 720,
      sm: 540,
      xs: 540,
    },
  },
};

const theme = {
  palette: {
    primary: {
      main: '#1D3557',
      light: '#457B9D',
      lighter: '#A8DADC',
      ultraLight: '#F1FAEE',
    },
    text: {
      main: '#FFFFFF',
      secondary: '#333333',
    },
    background: {
      dark: '#1D3557',
      main: '#FFFFFF',
      light: '#F0F0F0',
    },
    warning: {
      main: '#E63946',
    },
  },
  borderRadius: '8px',
  typography: {
    fontFamily: 'Inter',
    fontSize: 14,
  },
  fontSizes: {
    small: '1em',
    medium: '1.3em',
    large: '2em',
  },
};

const muiTheme = createTheme(theme);

export default muiTheme;

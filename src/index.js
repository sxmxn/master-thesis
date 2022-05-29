import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';

import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle, gridTheme } from 'styles/theme';
import { GridThemeProvider } from 'styled-bootstrap-grid';
import reportWebVitals from './reportWebVitals';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GridThemeProvider gridTheme={gridTheme}>
        <GlobalStyle />
        <App />
      </GridThemeProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

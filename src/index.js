import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';

import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme, { GlobalStyle, gridTheme } from 'styles/theme';
import { GridThemeProvider } from 'styled-bootstrap-grid';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <GridThemeProvider gridTheme={gridTheme}>
            <GlobalStyle />
            <App />
          </GridThemeProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

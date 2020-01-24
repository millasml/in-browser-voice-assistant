import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Controller from './App';
import * as serviceWorker from './serviceWorker';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

// TODO: update fonts and colours

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Controller />
  </ThemeProvider>,
  document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { useEffect } from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import domo from 'ryuu.js';
import skiiri from '../../assets/skiiri.png';
import Registration from '../Registration';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: '#fc8f13',
        color: 'white',
        '&:hover': {
          backgroundColor: '#ed8003',
        }
      },
    }
  },
  palette: {
    text: {
      primary: 'rgba(0, 0, 0, 0.8)',
      secondary: 'rgba(0, 0, 0, 0.4)'
    }
  }
});

function App() {
  useEffect(() => {
    domo.get(`/domo/datastores/v1/collections/`)
      .then(data => {})
      .catch(e => {
        domo.post(`/domo/datastores/v1/collections`, { "name": "skiiri" })
          .then(data => console.log(data));
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box textAlign="center">
        <img src={skiiri} alt="SKiiRI"></img>
      </Box>
      <Registration />
    </ThemeProvider>
  );
}

export default App;

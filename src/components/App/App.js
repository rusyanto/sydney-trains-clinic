import React, { useEffect } from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import domo from 'ryuu.js';
import domoSwirl from '../../assets/domo_swirl.jpg'
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
        domo.post(`/domo/datastores/v1/collections`, { "name": "ClinicRegistration" })
          .then(data => console.log(data));
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <img src={domoSwirl} alt="Domo Swirl" style={{ borderRadius: 4 }}></img>
      <Registration />
    </ThemeProvider>
  );
}

export default App;

import React, { Component } from 'react';
import './styles/App.css';
import Spotify from 'spotify-web-api-js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginPage from './components/LoginPage';
import TrackPage from './components/TrackPage';

class App extends Component {

  constructor() {
    super();
    this.state = { 
      isLoggedIn: false,
    }
    this.logIn = this.logIn.bind(this);
  }

  logIn = () => this.setState({ isLoggedIn: true });

  render() {
    return (
      <MuiThemeProvider>
        {
          this.state.isLoggedIn 
            ? <TrackPage />
            : <LoginPage logIn={this.logIn}/>
        }
      </MuiThemeProvider>
        
    );
  }
}

export default App;

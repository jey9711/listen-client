import React, { Component } from 'react';
import './styles/App.css';
import Spotify from 'spotify-web-api-js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoginPage from './components/LoginPage';
import TrackPage from './components/TrackPage';
import QueryString from 'query-string';

class App extends Component {

  constructor() {
    super();
    this.state = { 
      accessToken: '',
      isLoggedIn: false,
      userInfo: null,
      userPlayerInfo: null
    }
    this.logIn = this.logIn.bind(this);
    this.getSpotifyUserInfo = this.getSpotifyUserInfo.bind(this);
    this.getSpotifyUserPlayerInfo = this.getSpotifyUserPlayerInfo.bind(this);
  }

  componentDidMount() {
    const parsed = QueryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    if (accessToken) {
      this.getSpotifyUserInfo(accessToken);
      this.getSpotifyUserPlayerInfo(accessToken);
      this.setState({ isLoggedIn: true });
    }
  }

  getSpotifyUserInfo = (accessToken) => {
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json(accessToken))
      .then(data => this.setState({ 
        userInfo: {
          profilePicture: data.images[0].url
        }
      }));
  }

  getSpotifyUserPlayerInfo = (accessToken) => {
    fetch('https://api.spotify.com/v1/me/player', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json())
      .then(data => this.setState({ 
        userPlayerInfo: {
          trackImgSrc: data.item.album.images[1].url,
          trackTitle: data.item.name,
          trackArtists: data.item.artists,
          trackProgress: data.progress_ms,
          trackDuration: data.item.duration_ms,
        } 
      }));
  }

  logIn = () => window.location=`${BACKEND_URI}/login`

  render() {
    return (
      <MuiThemeProvider>
        {
          this.state.isLoggedIn
            ? <TrackPage userInfo={this.state.userInfo} userPlayerInfo={this.state.userPlayerInfo}/>
            : <LoginPage logIn={this.logIn}/>
        }
      </MuiThemeProvider>
        
    );
  }
}

export default App;

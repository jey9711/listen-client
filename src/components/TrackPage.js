import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import Palette from 'react-palette';

import MainAppBar from './MainAppBar';
import PeopleDrawer from './PeopleDrawer';
import TrackDescription from './TrackDescription';
import BottomNavPlayer from './BottomNavPlayer';

// import { Grid, Row, Col } from 'react-material-responsive-grid';

const spotifyWebApi = new Spotify();

class TrackPage extends Component {

  constructor() {
    super();
    const params = this.getHashParams();

    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: 'nothing!',
      people: [
        "https://s3-lc-upload.s3.amazonaws.com/users/jey9711/avatar_1520649077.png",
        "https://yt3.ggpht.com/a-/AJLlDp1M4ABJkU6G_Jbf07yDkAW8c1JCmpWh02Q3xA=s900-mo-c-c0xffffffff-rj-k-no"
      ],
      songDuration: 600000,
      songProgress: 500000,
      openDrawer: false,
      // albumImgSrc: "https://is1-ssl.mzstatic.com/image/thumb/Music6/v4/f6/40/c8/f640c8b9-b2f8-905a-9fff-2d38d8bfe35b/UMG_cvrart_00602547587428_01_RGB72_1500x1500_15UMGIM59808.jpg/1200x630bb.jpg",
      // songTitle: 'Love Yourself',
      // singer: 'Justin Bieber',
      // albumImgSrc: "https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/22/b1/df/22b1dfb2-1637-f3fd-79ce-9464340f7b95/886446326146.jpg/600x600bf.jpg",
      // songTitle: "Young Dumb & Broke",
      // singer: "Khalid",
      // albumImgSrc:"https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/32/53/40/325340a2-c77e-777d-c391-64ed74434f2d/886446870298.jpg/1200x630bb.jpg",
      // songTitle:"Real Friends",
      // singer: "Camila Cabello",
      // albumImgSrc: "https://is3-ssl.mzstatic.com/image/thumb/Music62/v4/d1/8c/44/d18c44ef-a19b-1c33-47c2-0ae58c5acad3/UMG_cvrart_00602557212396_01_RGB72_1800x1800_16UMGIM67863.jpg/1200x630bb.jpg",
      // songTitle: "Starboy",
      // singer: "The Weeknd",
      // albumImgSrc: "https://is4-ssl.mzstatic.com/image/thumb/Music118/v4/58/88/f7/5888f751-c95f-ba5e-2524-377b76b129ac/075679878892.jpg/1200x630bb.jpg",
      // songTitle: "Finesse [feat. Cardi B]",
      // singer: "Bruno Mars",
      // albumImgSrc: "https://is4-ssl.mzstatic.com/image/thumb/Music60/v4/9e/b5/a0/9eb5a0f4-6640-51e5-ce9f-e7693d696a68/mzm.omtrmqdi.jpg/1200x630bb.jpg",
      // songTitle: "We Don't Talk Anymore [feat. Selena Gomez]",
      // singer: "Charlie Puth",
      albumImgSrc: "https://is5-ssl.mzstatic.com/image/thumb/Music118/v4/83/1c/87/831c871d-71f1-2175-2e0d-79f1139eb4b1/UMG_cvrart_00602567350248_01_RGB72_3000x3000_18UMGIM00001.jpg/1200x630bb.jpg",
      songTitle: "All The Stars [feat. SZA]",
      singer: "Kendrick Lamar",
      albumDominantColor: "#000000",
      searchDataSource: [
        'Justin Bieber',
        'Selena Gomez',
        'Sam Smith',
        'Khalid',
        'SZA',
        'Camila Cabello',
        'Charlie Puth',
        'Bruno Mars'
      ]
    }

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }

  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
      // .then(resp => this.setState({
      //   nowPlaying: resp.item.name,
      //   duration: resp.item.duration_ms
      // }))
      .then(resp => console.log(resp.item))
  }

  _handleSlider = (event, value) => this.setState({ songProgress: value });

  _handleToggleDrawer = () => this.setState({ openDrawer: !this.state.openDrawer });

  render() {
    return (
      <Palette image={this.state.albumImgSrc}>
        {palette => (
          <div style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            background: `linear-gradient(to bottom, ${palette.darkVibrant} 0%, #000000 80%)`,
          }}>
            <MainAppBar
              isPeopleDrawerOpen={this.state.openDrawer}
              handleToggleDrawer={this._handleToggleDrawer}
              searchDataSource={this.state.searchDataSource}
              palette={palette}
            />
            <PeopleDrawer
              isOpen={this.state.openDrawer}
              people={this.state.people}
            />
            <TrackDescription
              albumImgSrc={this.state.albumImgSrc}
              songTitle={this.state.songTitle}
              singer={this.state.singer}
              style={{ paddingTop: '15%' }}
            />
            <BottomNavPlayer
              songProgress={this.state.songProgress}
              songDuration={this.state.songDuration}
              handleSlider={this._handleSlider}
            />
          </div>
        )}
      </Palette>
    )
  }
}

export default TrackPage;

import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-material-responsive-grid';

class TrackDescription extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Grid style={{ textAlign: 'center', ...this.props.style }}>
        <Row>
          <Col xs4={4} sm={12} md={12} lg={12}>
            <img
              src={this.props.albumImgSrc}
              width="300px"
              alt=""
            />
            <h4 style={{
              marginTop: '10px',
              marginBottom: '0px',
              color: '#ffffff'
            }}>
              {this.props.songTitle}
            </h4>
            <p style={{
              fontSize: '13.5px',
              color: '#777777'
            }}>
              {this.props.singer}
            </p>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default TrackDescription;
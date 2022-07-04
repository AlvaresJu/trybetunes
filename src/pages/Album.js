import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      headerLoaded: false,
    };
  }

  isHeaderLoaded = (aswer) => {
    this.setState({
      headerLoaded: aswer,
    });
  }

  render() {
    const { headerLoaded } = this.state;
    return (
      <div data-testid="page-album">
        <Header isLoaded={ this.isHeaderLoaded } />
        {
          headerLoaded && <p>Minha página de Album</p>
        }
      </div>
    );
  }
}

export default Album;

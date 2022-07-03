import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>Minha página de Album</p>
      </div>
    );
  }
}

export default Album;

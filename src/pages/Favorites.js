import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
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
      <div data-testid="page-favorites">
        <Header isLoaded={ this.isHeaderLoaded } />
        {
          headerLoaded && <p>Minha página de Favoritos</p>
        }
      </div>
    );
  }
}

export default Favorites;

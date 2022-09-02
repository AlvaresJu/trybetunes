import React, { Component } from 'react';
import logo from '../images/LOGO_POSITIVA 1.png';
import '../styles/notFound.css';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found">
        <img alt="Trybe Tunes logo" src={ logo } className="logo-m" />
        <div className="not-found-text">
          <h1>Ops!</h1>
          <p>A página que você está procurando não foi encontrada.</p>
        </div>
      </div>
    );
  }
}

export default NotFound;

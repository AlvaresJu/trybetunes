import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Minha página de Perfil</p>
      </div>
    );
  }
}

export default Profile;

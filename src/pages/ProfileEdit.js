import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Minha página de Edição do Perfil</p>
      </div>
    );
  }
}

export default ProfileEdit;

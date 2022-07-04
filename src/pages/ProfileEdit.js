import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
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
      <div data-testid="page-profile-edit">
        <Header isLoaded={ this.isHeaderLoaded } />
        {
          headerLoaded && <p>Minha página de Edição do Perfil</p>
        }
      </div>
    );
  }
}

export default ProfileEdit;

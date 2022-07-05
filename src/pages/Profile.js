import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import genericUser from '../images/user_generic.png';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      headerLoaded: false,
      loading: false,
      userData: {},
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.setState({
      loading: true,
    }, async () => {
      const requestUserData = await getUser();
      this.setState({
        userData: requestUserData,
        loading: false,
      });
    });
  }

  isHeaderLoaded = (aswer) => {
    this.setState({
      headerLoaded: aswer,
    });
  }

  handleEditBtn = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  }

  selectPageContent = (loading, userData) => {
    if (loading) return <Loading />;

    const { name, email, image, description } = userData;
    return (
      <section>
        <div>
          <img
            src={ (image.length > 0) ? image : genericUser }
            alt={ name }
            data-testid="profile-image"
          />
          <button type="button" onClick={ this.handleEditBtn }>
            Editar perfil
          </button>
        </div>
        <h3>Nome:</h3>
        <p>{name}</p>
        <h3>E-mail:</h3>
        <p>{email}</p>
        <h3>Descrição:</h3>
        <p>{description}</p>
      </section>
    );
  }

  render() {
    const { headerLoaded, userData, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header isLoaded={ this.isHeaderLoaded } />
        {
          headerLoaded && this.selectPageContent(loading, userData)
        }
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;

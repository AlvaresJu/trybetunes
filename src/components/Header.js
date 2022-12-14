import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsPersonCircle } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/Logo-header.png';
import '../styles/header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userImage: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.setState({
      loading: true,
    }, async () => {
      this.checkIfIsloaded();
      const requestUserData = await getUser();
      this.setState({
        userName: requestUserData.name,
        userImage: requestUserData.image,
        loading: false,
      }, () => {
        this.checkIfIsloaded();
      });
    });
  }

  checkIfIsloaded = () => {
    const { isLoaded } = this.props;
    const { loading } = this.state;
    isLoaded(!loading);
  }

  render() {
    const { loading, userName, userImage } = this.state;
    if (loading) return <Loading />;
    return (
      <>
        <header data-testid="header-component">
          <img alt="Trybe Tunes logo" src={ logo } />
          <div className="user-header">
            {
              (userImage.length > 0)
                ? <img src={ userImage } alt={ userName } />
                : <BsPersonCircle className="user-icon" />
            }
            <p data-testid="header-user-name">{ userName }</p>
          </div>
        </header>
        <nav>
          <NavLink
            to="/search"
            activeClassName="selected"
            data-testid="link-to-search"
          >
            Buscar Álbuns
          </NavLink>
          <NavLink
            to="/favorites"
            activeClassName="selected"
            data-testid="link-to-favorites"
          >
            Músicas Favoritas
          </NavLink>
          <NavLink
            to="/profile"
            activeClassName="selected"
            data-testid="link-to-profile"
          >
            Meu Perfil
          </NavLink>
        </nav>
      </>
    );
  }
}

Header.propTypes = {
  isLoaded: PropTypes.func.isRequired,
};

export default Header;

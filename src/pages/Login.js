import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logo from '../images/LOGO_POSITIVA 1.png';
import '../styles/login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userData: {
        name: '',
      },
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      userData: {
        [name]: value,
      },
    });
  }

  isValidName = (name) => {
    const minNameLength = 3;
    return (name.length >= minNameLength);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { userData } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      await createUser(userData);
      history.push('/search');
    });
  }

  render() {
    const { userData, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login" className="login-page">
        <img alt="Trybe Tunes logo" src={ logo } className="logo-m" />
        <form className="login-form">
          <fieldset>
            <input
              type="text"
              name="name"
              data-testid="login-name-input"
              placeholder="Nome do Usuário"
              value={ userData.name }
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ !this.isValidName(userData.name) }
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

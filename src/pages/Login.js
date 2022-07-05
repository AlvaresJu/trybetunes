import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logo from '../images/LOGO_POSITIVA 1.png';

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
      <div data-testid="page-login">
        <img alt="Trybe Tunes logo" src={ logo } />
        <form>
          <fieldset>
            <legend>Login</legend>
            <input
              type="text"
              name="name"
              data-testid="login-name-input"
              placeholder="Nome do Usuário"
              value={ userData.name }
              onChange={ this.handleChange }
            />
            <BsSearch />
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

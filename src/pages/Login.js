import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userData: {
        name: '',
      },
      loading: false,
      submitted: false,
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
    this.setState({
      loading: true,
      submitted: true,
    }, async () => {
      await createUser(userData);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { userData, loading, submitted } = this.state;
    if (!submitted) {
      return (
        <div data-testid="page-login">
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
    if (loading) return <Loading />;
    return <Redirect to="/search" />;
  }
}

export default Login;

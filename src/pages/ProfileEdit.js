import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import genericUser from '../images/user_generic.png';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      headerLoaded: false,
      loading: false,
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { name, email, image, description } = await getUser();
      this.setState({
        userName: name,
        userEmail: email,
        userImage: image,
        userDescription: description,
        loading: false,
      });
    });
  }

  isHeaderLoaded = (aswer) => {
    this.setState({
      headerLoaded: aswer,
    });
  }

  selectPageContent = (name, email, image, description) => {
    const { loading } = this.state;
    if (loading) return <Loading />;

    return (
      <form>
        <div>
          <img src={ (image.length > 0) ? image : genericUser } alt={ name } />
          <label htmlFor="userImage">
            Link para imagem:
            <input
              type="url"
              data-testid="edit-input-image"
              name="userImage"
              id="userImage"
              placeholder="Insira um link"
              value={ image }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <label htmlFor="userName">
          Nome:
          <p>Obs: Fique à vontade para usar seu nome social</p>
          <input
            type="text"
            data-testid="edit-input-name"
            name="userName"
            id="userName"
            placeholder="Seu nome"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="userEmail">
          E-mail:
          <p>Obs: Escolha um e-mail que consulte frequentemente</p>
          <input
            type="email"
            data-testid="edit-input-email"
            name="userEmail"
            id="userEmail"
            placeholder="usuario@usuario.com.br"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="userDescription">
          Descrição:
          <textarea
            data-testid="edit-input-description"
            name="userDescription"
            id="userDescription"
            placeholder="sobre mim"
            maxLength={ 220 }
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ !this.validateForm() }
          onClick={ this.handleSubmit }
        >
          Salvar
        </button>
      </form>
    );
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { userName, userEmail, userImage, userDescription } = this.state;
    const updateUserObj = {
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    };
    this.setState({
      loading: true,
    }, async () => {
      await updateUser(updateUserObj);
      const { history } = this.props;
      history.push('/profile');
    });
  }

  validateForm = () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    const allFilledIn = this.isAllFilledIn(
      userName, userEmail, userImage, userDescription,
    );
    const validEmail = this.isValidEmail(userEmail);
    return (allFilledIn && validEmail);
  }

  isAllFilledIn = (...inputValues) => inputValues.every((value) => value.length > 0);

  isValidEmail = (email) => (/\S+@\S+\.\S+/).test(email);

  render() {
    const {
      headerLoaded,
      userName,
      userEmail,
      userImage,
      userDescription,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header isLoaded={ this.isHeaderLoaded } />
        {
          headerLoaded && this.selectPageContent(
            userName, userEmail, userImage, userDescription,
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;

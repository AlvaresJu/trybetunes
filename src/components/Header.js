import React, { Component } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
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
      const requestUserData = await getUser();
      this.setState({
        userName: requestUserData.name,
        loading: false,
      });
    });
  }

  render() {
    const { loading, userName } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <img alt="Trybe Tunes logo" src="" />
        <div>
          <BsPersonCircle />
          <p data-testid="header-user-name">{ userName }</p>
        </div>
      </header>
    );
  }
}

export default Header;

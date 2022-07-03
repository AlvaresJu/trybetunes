import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchedArtist: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  isValidArtist = (artist) => {
    const minArtistLength = 2;
    return (artist.length >= minArtistLength);
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const { searchedArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="searchedArtist"
            data-testid="search-artist-input"
            placeholder="Nome do Artista/Banda"
            value={ searchedArtist }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ !this.isValidArtist(searchedArtist) }
            onClick={ this.handleSubmit }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

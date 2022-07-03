import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <p>Minha página de Busca</p>
      </div>
    );
  }
}

export default Search;

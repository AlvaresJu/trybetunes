import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistInput: '',
      loading: false,
      searchedArtist: '',
      albumsList: undefined,
      headerLoaded: false,
    };
  }

  isHeaderLoaded = (aswer) => {
    this.setState({
      headerLoaded: aswer,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  isValidSearch = (artist) => {
    const minArtistLength = 2;
    return (artist.length >= minArtistLength);
  }

  handleSearch = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      loading: true,
      searchedArtist: prevState.artistInput,
      artistInput: '',
    }), async () => {
      const { searchedArtist } = this.state;
      const artistAlbumsData = await searchAlbumsAPI(searchedArtist);
      this.setState({
        albumsList: artistAlbumsData,
        loading: false,
      });
    });
  }

  searchReturn = (albums) => {
    if (!albums) return <p />;
    if (albums.length === 0) return <h1>Nenhum álbum foi encontrado</h1>;

    const { searchedArtist } = this.state;
    const yearEndPosition = 4;
    const albumCards = albums.map(({
      artworkUrl100,
      collectionName,
      collectionId,
      artistName,
      releaseDate,
    }) => (
      <AlbumCard
        key={ collectionId }
        collectionImage={ artworkUrl100 }
        collectionName={ collectionName }
        collectionId={ collectionId }
        artistName={ artistName }
        releaseYear={ releaseDate.slice(0, yearEndPosition) }
      />
    ));
    return (
      <>
        <h3>{`Resultado de álbuns de: ${searchedArtist}`}</h3>
        <div>{ albumCards }</div>
      </>
    );
  }

  render() {
    const { artistInput, loading, albumsList, headerLoaded } = this.state;
    return (
      <div data-testid="page-search">
        <Header isLoaded={ this.isHeaderLoaded } />
        {
          headerLoaded && (
            <form>
              <input
                type="text"
                name="artistInput"
                data-testid="search-artist-input"
                placeholder="Nome do Artista/Banda"
                value={ artistInput }
                onChange={ this.handleChange }
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ !this.isValidSearch(artistInput) }
                onClick={ this.handleSearch }
              >
                Pesquisar
              </button>
            </form>
          )
        }
        <section>
          {
            loading ? <Loading /> : this.searchReturn(albumsList)
          }
        </section>
      </div>
    );
  }
}

export default Search;

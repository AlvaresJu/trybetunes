import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      headerLoaded: false,
      loading: false,
      favoriteList: [],
    };
  }

  componentDidMount() {
    this.fetchFavoriteMusics();
  }

  fetchFavoriteMusics = () => {
    this.setState({
      loading: true,
    }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({
        favoriteList: favorites,
        loading: false,
      });
    });
  }

  isHeaderLoaded = (aswer) => {
    this.setState({
      headerLoaded: aswer,
    });
  }

  removeFavorite = (favoriteMusic, musicData) => {
    this.setState({
      loading: true,
    }, async () => {
      if (!favoriteMusic) await removeSong(musicData);
      const favorites = await getFavoriteSongs();
      this.setState({
        favoriteList: favorites,
        loading: false,
      });
    });
  }

  selectPageContent = (loading, favoriteList) => {
    if (loading) return <Loading />;

    const musicCards = favoriteList.map((musicObj) => (
      <div key={ musicObj.trackId }>
        <Link to={ `/album/${musicObj.collectionId}` }>
          <img
            src={ musicObj.artworkUrl60 }
            alt={ `Album: ${musicObj.collectionName}` }
          />
        </Link>
        <MusicCard
          musicData={ musicObj }
          favoriteList={ favoriteList }
          updateFavorites={ this.removeFavorite }
        />
      </div>
    ));
    return (
      <section>{ musicCards }</section>
    );
  }

  render() {
    const { headerLoaded, loading, favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header isLoaded={ this.isHeaderLoaded } />
        {
          headerLoaded && this.selectPageContent(loading, favoriteList)
        }
      </div>
    );
  }
}

export default Favorites;

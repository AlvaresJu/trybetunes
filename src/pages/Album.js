import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      headerLoaded: false,
      loading: false,
      albumData: undefined,
      dataMusics: [],
      favoriteList: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
    this.fetchFavoriteMusics();
  }

  fetchMusics = () => {
    const { match } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const requestMusicsData = await getMusics(match.params.id);
      this.setState({
        albumData: requestMusicsData[0],
        dataMusics: requestMusicsData.filter((_obj, index) => index !== 0),
        loading: false,
      });
    });
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

  updateFavorites = (favoriteMusic, musicData) => {
    this.setState({
      loading: true,
    }, async () => {
      if (favoriteMusic) await addSong(musicData);
      if (!favoriteMusic) await removeSong(musicData);
      const favorites = await getFavoriteSongs();
      this.setState({
        favoriteList: favorites,
        loading: false,
      });
    });
  }

  selectPageContent = (loading, albumData, dataMusics, favoriteList) => {
    if (loading) return <Loading />;
    if (!albumData) return <h1>Álbum não encontrado</h1>;

    const { artworkUrl100, collectionName, artistName, releaseDate } = albumData;
    const musicCards = dataMusics.map((musicObj) => (
      <MusicCard
        key={ musicObj.trackId }
        musicData={ musicObj }
        favoriteList={ favoriteList }
        updateFavorites={ this.updateFavorites }
      />
    ));
    return (
      <section>
        <div>
          <img
            src={ artworkUrl100 }
            alt={ `Album: ${collectionName}` }
          />
          <h4 data-testid="album-name">{ collectionName }</h4>
          <p data-testid="artist-name">{ artistName }</p>
          <p>{ this.extractYear(releaseDate) }</p>
        </div>
        <div>{ musicCards }</div>
      </section>
    );
  }

  extractYear = (date) => {
    const yearEndPosition = 4;
    if (!date) return '';
    return date.slice(0, yearEndPosition);
  }

  render() {
    const { headerLoaded, loading, albumData, dataMusics, favoriteList } = this.state;
    return (
      <div data-testid="page-album">
        <Header isLoaded={ this.isHeaderLoaded } />
        {
          headerLoaded && this.selectPageContent(
            loading, albumData, dataMusics, favoriteList,
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

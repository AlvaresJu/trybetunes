import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favoriteMusic: false,
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
      }, () => {
        const { musicData } = this.props;
        const { favoriteList } = this.state;
        this.checkIfInFavoriteList(musicData, favoriteList);
      });
    });
  }

  checkIfInFavoriteList = (music, favorites) => {
    const isFavorite = favorites.some(({ trackId }) => trackId === music.trackId);
    if (isFavorite) {
      this.setState({
        favoriteMusic: true,
      });
    }
  }

  handleCheck = ({ target }) => {
    const { name, checked } = target;
    this.setState({
      [name]: checked,
    }, () => {
      const { favoriteMusic } = this.state;
      const { musicData } = this.props;
      if (favoriteMusic) this.handleFavorite(musicData, addSong);
      if (!favoriteMusic) this.handleFavorite(musicData, removeSong);
    });
  }

  handleFavorite = (musicData, callback) => {
    this.setState({
      loading: true,
    }, async () => {
      await callback(musicData);
      const favorites = await getFavoriteSongs();
      this.setState({
        favoriteList: favorites,
        loading: false,
      });
    });
  }

  render() {
    const { favoriteMusic, loading } = this.state;
    if (loading) return <Loading />;

    const { musicData } = this.props;
    return (
      <div>
        <h5>{ musicData.trackName }</h5>
        <audio data-testid="audio-component" src={ musicData.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ musicData.trackId }>
          <input
            type="checkbox"
            name="favoriteMusic"
            data-testid={ `checkbox-music-${musicData.trackId}` }
            id={ musicData.trackId }
            checked={ favoriteMusic }
            onChange={ this.handleCheck }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicData: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }),
};

MusicCard.defaultProps = {
  musicData: PropTypes.shape({
    trackName: '',
    trackId: 0,
    previewUrl: '',
  }),
};

export default MusicCard;

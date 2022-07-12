import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import '../styles/musicCard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favoriteMusic: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { musicData, favoriteList } = this.props;
    this.checkIfInFavoriteList(musicData, favoriteList);
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
      const { musicData, updateFavorites } = this.props;
      updateFavorites(favoriteMusic, musicData);
    });
  }

  render() {
    const { favoriteMusic, loading } = this.state;
    if (loading) return <Loading />;

    const { musicData } = this.props;
    return (
      <div className="music-data">
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
  favoriteList: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateFavorites: PropTypes.func.isRequired,
  musicData: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;

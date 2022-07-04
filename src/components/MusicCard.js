import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicName, musicUrl, musicId } = this.props;
    return (
      <div>
        <h5>{ musicName }</h5>
        <audio data-testid="audio-component" src={ musicUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ musicId }>
          <input
            type="checkbox"
            name="favoriteMusic"
            id={ musicId }
            // checked=""
            onChange={ () => {} }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  musicUrl: PropTypes.string.isRequired,
  musicId: PropTypes.number.isRequired,
};

export default MusicCard;

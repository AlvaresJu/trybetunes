import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/albumCard.css';

class AlbumCard extends Component {
  render() {
    const {
      collectionImage,
      collectionName,
      collectionId,
      artistName,
      releaseYear,
    } = this.props;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        className="album-card"
      >
        <div>
          <img src={ collectionImage } alt={ `Album: ${collectionName}` } />
          <h4>{ collectionName }</h4>
          <p>{ artistName }</p>
          <p>{ releaseYear }</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  collectionImage: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  releaseYear: PropTypes.string.isRequired,
};

export default AlbumCard;

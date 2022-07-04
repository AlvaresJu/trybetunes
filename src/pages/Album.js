import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      headerLoaded: false,
      loading: false,
      albumData: undefined,
      musicsData: [],
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = () => {
    const { match } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const requestMusicsData = await getMusics(match.params.id);
      this.setState({
        albumData: requestMusicsData[0],
        musicsData: requestMusicsData.filter((_obj, index) => index !== 0),
        loading: false,
      });
    });
  }

  isHeaderLoaded = (aswer) => {
    this.setState({
      headerLoaded: aswer,
    });
  }

  selectPageContent = (loading, albumData, musicsData) => {
    if (loading) return <Loading />;
    if (!albumData) return <h1>Álbum não encontrado</h1>;

    const { artworkUrl100, collectionName, artistName, releaseDate } = albumData;
    const musicCards = musicsData.map(({ trackId, trackName, previewUrl }) => (
      <MusicCard
        key={ trackId }
        musicName={ trackName }
        musicUrl={ previewUrl }
        musicId={ trackId }
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
    const { headerLoaded, loading, albumData, musicsData } = this.state;
    return (
      <div data-testid="page-album">
        <Header isLoaded={ this.isHeaderLoaded } />
        {
          headerLoaded && this.selectPageContent(loading, albumData, musicsData)
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};

export default Album;

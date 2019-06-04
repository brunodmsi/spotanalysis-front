import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import spotify from '../../services/spotify';
import api from '../../services/api';

import AudioFeatureTable from '../../components/AudioFeatureTable/index';
import Spinner from '../../components/Spinner/index';

import {
  Container, Form, Logo, Wrap, Error, TracksButton,
} from './styles';

import logo from '../../assets/logo.png';

class Main extends Component {
  state = {
    value: '',
    loading: false,
    error: '',
    track: '',
    isTrackLoaded: false,
  };

  async componentDidMount() {
    const ACCESS_TOKEN = localStorage.getItem('@Spotanalysis:accessToken');
    const param = window.location.hash;

    if (ACCESS_TOKEN === null) {
      if (param.startsWith('#access_token')) {
        const [, token] = param.split(/[=&]/);
        localStorage.setItem('@Spotanalysis:accessToken', token);
        spotify.setAccessToken(token);
      } else {
        window.location.href = 'https://spotanalysis-back.herokuapp.com/login'
      }
    } else {
      spotify.setAccessToken(ACCESS_TOKEN);
      spotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', (err, data) => {
        if (err) {
          localStorage.removeItem('@Spotanalysis:accessToken');
          window.location.href = 'https://spotanalysis-back.herokuapp.com/login'
        }
      });
    }
  }

  loadAudioFeaturesTable = (track) => {
    this.setState({ track, loading: false, isTrackLoaded: true });
  };

  getAudioFeatures = async (val) => {
    if (val === '') {
      this.setState({ error: 'You need to input a track' });
      return;
    }
    this.setState({ error: '', loading: true });

    try {
      const data = await spotify.searchTracks(val, { limit: 5 });
      const track = data.tracks.items[0];
      const audioFeature = await spotify.getAudioFeaturesForTrack(track.id);

      const wrap = [];
      wrap.push(track);
      wrap.push(audioFeature);

      const res = await api.post('/save_track', wrap);

      this.loadAudioFeaturesTable(res.data);
    } catch (err) {
      this.setState({ error: err.toString(), loading: false });
    }
  };

  render() {
    const {
      value, error, loading, track, isTrackLoaded,
    } = this.state;

    return (
      <Container>
        <Logo src={logo} alt="Spotanalysis" />
        <Wrap>
          {error !== '' ? (
            <Error>
              <p>{error}</p>
            </Error>
          ) : (
            ''
          )}
          <Form>
            <input
              type="text"
              placeholder="Search for a song"
              value={value}
              onChange={e => this.setState({ value: e.target.value })}
            />

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ value: '' });
                this.getAudioFeatures(value);
              }}
            >
              OK
            </button>
          </Form>
          <Link to="/tracks">
            <TracksButton>See all</TracksButton>
          </Link>
          <Spinner loading={loading} />
          {isTrackLoaded ? <AudioFeatureTable track={track} /> : ''}
        </Wrap>
      </Container>
    );
  }
}

export default Main;

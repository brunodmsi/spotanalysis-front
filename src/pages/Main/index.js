/* eslint-disable no-await-in-loop */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import spotify from '../../services/spotify';
import api from '../../services/api';

import AudioFeatureTable from '../../components/AudioFeatureTable/index';
import Spinner from '../../components/Spinner/index';
import Bubble from '../../components/BubbleChart/index';

import {
  Container, Form, Logo, Wrap, Error, TracksButton, Select,
} from './styles';

import logo from '../../assets/logo.png';

class Main extends Component {
  state = {
    value: '',
    loading: false,
    error: '',
    showGraph: false,
    loud_danc: '',
    en_danc: '',
    track: '',
    isTrackLoaded: '',
    selected: 'playlist',
    playlistInfo: '',
  };

  async componentDidMount() {
    const ACCESS_TOKEN = localStorage.getItem('@Spotanalysis:accessToken');
    const param = window.location.hash;

    if (ACCESS_TOKEN === null) {
      if (param.startsWith('#access_token')) {
        const [, token] = param.split(/[=&]/);
        localStorage.setItem('@Spotanalysis:accessToken', token);
        spotify.setAccessToken(token);
        window.location.reload();
      } else {
        window.location.href = 'https://spotanalysis-back.herokuapp.com/';
      }
    } else {
      spotify.setAccessToken(ACCESS_TOKEN);
      spotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', (err, data) => {
        if (err) {
          localStorage.removeItem('@Spotanalysis:accessToken');
          window.location.href = 'https://spotanalysis-back.herokuapp.com/';
        }
      });
    }
  }

  loadAudioFeaturesTable = (track) => {
    this.setState({
      track,
      loading: false,
      isTrackLoaded: true,
      showGraph: false,
    });
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
      this.setState({ error: err.toString(), loading: false, showGraph: false });
    }
  };

  getUserPlaylist = async (val) => {
    this.setState({ loading: true, showGraph: false });

    const [, id] = val.split('playlist/');

    try {
      const playlistInfo = await spotify.getPlaylist(id);
      delete playlistInfo.tracks;

      this.setState({ playlistInfo });

      let offset = 0;
      let songs = [];

      const ids = [];
      while (true) {
        const content = await spotify.getPlaylistTracks(id, { limit: 100, offset });
        songs = songs.concat(content.items);

        if (content.next !== null) offset += 100;
        else break;
      }

      for (let i = 0; i < songs.length; i += 1) {
        ids.push(songs[i].track.id);
      }

      let index = 0;
      const af = [];
      while (index < ids.length) {
        let tmp = [];
        for (let i = index; i < index + 50; i += 1) {
          tmp.push(ids[i]);
        }

        af.push(await spotify.getAudioFeaturesForTracks(tmp));

        index += 50;
        tmp += '';
      }

      const en_danc = [];
      const loud_danc = [];
      for (let i = 0; i < af.length; i += 1) {
        for (let j = 0; j < af[i].audio_features.length; j += 1) {
          en_danc.push({
            data: {
              label: songs[j].track.name,
              y: af[i].audio_features[j].energy,
              x: af[i].audio_features[j].danceability,
              r: 2,
            },
          });
          loud_danc.push({
            data: {
              label: songs[j].track.name,
              y: af[i].audio_features[j].loudness,
              x: af[i].audio_features[j].danceability,
              r: 2,
            },
          });
        }
      }

      this.setState({
        loading: false,
        showGraph: true,
        loud_danc,
        en_danc,
        isTrackLoaded: false,
      });
    } catch (err) {
      this.setState({ error: err.toString(), loading: false, isTrackLoaded: false });
    }
  };

  render() {
    const {
      value,
      error,
      loading,
      showGraph,
      loud_danc,
      en_danc,
      track,
      isTrackLoaded,
      selected,
      playlistInfo,
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
              placeholder={
                selected === 'playlist' ? 'Playlist Audio Features' : 'Track Audio Features'
              }
              value={value}
              onChange={e => this.setState({ value: e.target.value })}
            />

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ value: '' });
                if (selected === 'playlist') this.getUserPlaylist(value);
                else this.getAudioFeatures(value);
              }}
            >
              OK
            </button>
          </Form>
          <div>
            <Link to="/tracks">
              <TracksButton>See all</TracksButton>
            </Link>
            {selected === 'track' ? (
              <Select onClick={() => this.setState({ selected: 'playlist' })}>Playlist</Select>
            ) : (
              <Select onClick={() => this.setState({ selected: 'track' })}>Track</Select>
            )}
          </div>
        </Wrap>
        <br />

        <Spinner loading={loading} />

        {showGraph ? (
          <Bubble data={loud_danc} info={playlistInfo} title="Loudness x Danceability" />
        ) : (
          ''
        )}
        {showGraph ? (
          <Bubble data={en_danc} info={playlistInfo} title="Energy x Danceability" />
        ) : (
          ''
        )}

        {isTrackLoaded ? <AudioFeatureTable track={track} /> : ''}
      </Container>
    );
  }
}

export default Main;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Modal from 'react-awesome-modal';

import api from '../../services/api';

import Spinner from '../../components/Spinner/index';
import AudioFeatureTable from '../../components/AudioFeatureTable/index';

import {
  Container,
  Logo,
  TopSong,
  TopSongText,
  Image,
  Separator,
  TopSongInfo,
  Song,
  DivisorTxt,
} from './styles';

import logo from '../../assets/logo.png';

class Tracks extends Component {
  state = {
    loading: true,
    tracks: '',
    topTrack: '',
    visible: false,
    selectedTrack: '',
  };

  async componentDidMount() {
    const tracks = await api.get('/tracks');

    const topTrack = tracks.data[0];
    tracks.data.shift();

    this.setState({ topTrack, tracks: tracks.data, loading: false });
  }

  setModalTrack(track) {
    this.setState({ selectedTrack: track });
    this.openModal();
  }

  openModal() {
    this.setState({ visible: true });
  }

  closeModal() {
    this.setState({ visible: false });
  }

  render() {
    const {
      loading, tracks, topTrack, visible, selectedTrack,
    } = this.state;

    return (
      <Container>
        <Logo alt="Spotanalysis" src={logo} />
        <Link to="/" style={{ paddingBottom: 20 }}>
          Voltar
        </Link>
        <Spinner loading={loading} />
        {!loading ? (
          <div>
            <TopSongText>Most searched song:</TopSongText>
            <TopSong>
              <div>
                <a href={topTrack.album[0].external_urls.spotify}>
                  <Image src={topTrack.album[0].images[0].url} alt="album" />
                </a>
              </div>
              <TopSongInfo>
                <p>
                  Name:&nbsp;<strong>{topTrack.name}</strong>
                </p>
                Artist(s):&nbsp;
                {topTrack.artists.map(artist => (
                  <strong>
                    <a href={artist[0].external_urls.spotify}>
                      {artist[0].name}
                      <br />
                    </a>
                  </strong>
                ))}
                <p>
                  Times searched: <strong>{topTrack.times_searched}</strong>
                </p>
                <br />
                <button type="button" onClick={() => this.setModalTrack(topTrack)}>
                  Audio Features
                </button>
              </TopSongInfo>
            </TopSong>

            <DivisorTxt>Other searched songs:</DivisorTxt>

            {tracks.map(track => (
              <div>
                <Song>
                  <a href={track.album[0].external_urls.spotify}>
                    <Image src={track.album[0].images[0].url} alt="album" />
                  </a>
                  <TopSongInfo>
                    <p>
                      Name:&nbsp;<strong>{track.name}</strong>
                    </p>
                    Artist(s):&nbsp;
                    {track.artists.map(artist => (
                      <strong>
                        <a href={artist[0].external_urls.spotify}>
                          {artist[0].name}
                          <br />
                        </a>
                      </strong>
                    ))}
                    <p>
                      Times searched: <strong>{track.times_searched}</strong>
                    </p>
                    <button type="button" onClick={() => this.setModalTrack(track)}>
                      Audio Features
                    </button>
                  </TopSongInfo>
                </Song>

                <Separator />
              </div>
            ))}
          </div>
        ) : (
          ''
        )}

        <Modal
          visible={visible}
          width="500"
          height="800"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div style={{ backgroundColor: '#271F2C', alignItems: 'center' }}>
            {selectedTrack !== '' ? <AudioFeatureTable track={selectedTrack} /> : ''}
          </div>
        </Modal>
      </Container>
    );
  }
}

export default Tracks;

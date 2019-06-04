/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  SongContainer,
  SongImage,
  Wrap,
  SongInfoContainer,
  SongName,
  ArtistsName,
} from './styles';

const AudioFeatureTable = ({ track }) => (
  <Wrap>
    <SongContainer>
      <a href={track.album[0].external_urls.spotify}>
        <SongImage src={track.album[0].images[0].url} />
      </a>

      <SongInfoContainer>
        <SongName href={track.external_url}>{track.name}</SongName>
        <br />
        {track.artists.map(artist => (
          <ArtistsName href={artist[0].external_urls.spotify}>
            {artist[0].name}
            <br />
          </ArtistsName>
        ))}
      </SongInfoContainer>
    </SongContainer>

    <Table>
      {console.log(track)}
      <thead>
        <tr>
          <th>AudioFeatures</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Acousticness</td>
          <td>{track.audio_features.acousticness}</td>
        </tr>
        <tr>
          <td>Liveness</td>
          <td>{track.audio_features.liveness}</td>
        </tr>
        <tr>
          <td>Loudness</td>
          <td>{track.audio_features.loudness}</td>
        </tr>
        <tr>
          <td>Danceability</td>
          <td>{track.audio_features.danceability}</td>
        </tr>
        <tr>
          <td>Energy</td>
          <td>{track.audio_features.energy}</td>
        </tr>
        <tr>
          <td>Tempo</td>
          <td>{track.audio_features.tempo}</td>
        </tr>
        <tr>
          <td>Speechiness</td>
          <td>{track.audio_features.speechiness}</td>
        </tr>
        <tr>
          <td>Valence</td>
          <td>{track.audio_features.valence}</td>
        </tr>
        <tr>
          <td>Instrumentalness</td>
          <td>{track.audio_features.instrumentalness}</td>
        </tr>
      </tbody>
    </Table>
  </Wrap>
);

AudioFeatureTable.propTypes = {
  track: PropTypes.func.isRequired,
};

export default AudioFeatureTable;

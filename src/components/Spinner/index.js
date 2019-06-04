import React from 'react';
import PropTypes from 'prop-types';

import { BeatLoader } from 'react-spinners';

import { Wrap } from './styles';

const Spinner = ({ loading }) => (
  <Wrap>
    <BeatLoader sizeUnit="px" size={20} color="#E5556E" loading={loading} />
  </Wrap>
);

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner;

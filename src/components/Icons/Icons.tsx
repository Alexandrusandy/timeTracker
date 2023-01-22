import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlay, faRefresh, faStop} from '@fortawesome/free-solid-svg-icons';

const PlayIcon = () => (
  <FontAwesomeIcon icon={faPlay} size={30} color="#078955" />
);

const StopIcon = () => (
  <FontAwesomeIcon icon={faStop} size={30} color="#b42400" />
);

const ResetIcon = () => (
  <FontAwesomeIcon icon={faRefresh} size={20} color="#ff4d1b" />
);

export {PlayIcon, StopIcon, ResetIcon};

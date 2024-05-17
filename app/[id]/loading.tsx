import React from 'react';
import { Center, Flex, Loader } from '@mantine/core';

const Loading = () => {
  return (
    <Loader style={{
      position: 'fixed',
      top: '50%',
      left: '55%',
      transform: 'translate(-50%, -50%)',
    }} color="#9854F6" />
  );
};

export default Loading;
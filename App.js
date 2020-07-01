import React from 'react';
import {StatusBar, YellowBox} from 'react-native';
import Routes from './src/Routes';

console.disableYellowBox = true;

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#555" />
      <Routes />
    </>
  );
}

export default App;

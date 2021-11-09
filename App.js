import React from 'react';
import MainNavigator from './navigation/MainNavigator';
import useDatabase from './hooks/useDatabase';

export default App => {
  const isDBLoadingComplete = useDatabase();
  return (
    <MainNavigator />
  );
}
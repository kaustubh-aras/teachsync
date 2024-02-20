import React from 'react';
import {AuthProvider} from '../../../context/authContext';
import Navigation from './Navigation';

const RootNavigation = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default RootNavigation;

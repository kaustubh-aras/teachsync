import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// context
const AuthContext = createContext();

// provider
const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: '',
  });

  // Default Axios Settings
  // axios.defaults.baseURL = 'https://teachsync-pre-production-server.onrender.com/api';
  axios.defaults.baseURL = 'http://192.168.0.104:3000/api';

  // initial local storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      try {
        let data = await AsyncStorage.getItem('@auth');
        let loginData = JSON.parse(data);
        setState(state => ({
          ...state,
          user: loginData?.user,
          token: loginData?.token,
        }));
      } catch (error) {
        // Handle the error (e.g., log it or set default values)
        console.error('Error loading data from local storage:', error);
      }
    };
    loadLocalStorageData();
  }, []);

  let token = state && state.token;

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};

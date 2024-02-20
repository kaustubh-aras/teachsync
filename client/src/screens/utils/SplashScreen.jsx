import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {AuthContext} from '../../../context/authContext';

const SplashScreen = ({navigation}) => {
  const [state] = useContext(AuthContext);
  const authenticatedUser = state?.user && state?.token;

  useEffect(() => {
    const navigateToScreen = () => {
      if (authenticatedUser) {
        navigation.replace('MyTabs');
      } else {
        navigation.replace('Login');
      }
    };

    const timeoutId = setTimeout(navigateToScreen, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigation, authenticatedUser]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/splashscreen.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    backgroundColor: 'black',
    width: width,
    height: height,
  },
});

export default SplashScreen;

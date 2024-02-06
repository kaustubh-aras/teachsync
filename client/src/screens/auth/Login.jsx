import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
// import axios from 'axios';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [inputEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    // Reset Errors when the component is focused again
    if (isFocused) {
      setEmailError('');
      setPasswordError('');
    }
  }, [isFocused]);

  const handleLogin = async () => {
    try {
      // Reset Errors
      setEmailError('');
      setPasswordError('');

      if (!inputEmail) {
        setEmailError('Email is required');
        return;
      }

      if (!password) {
        setPasswordError('Password is required');
        return;
      }

      navigation.navigate('MyTabs');
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />

        <View>
          <TextInput
            autoCapitalize="none"
            style={[styles.input, emailError && styles.errorInput]}
            placeholder="Enter Email"
            onChangeText={text => setEmail(text)}
            value={inputEmail}
            keyboardType="email-address"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        <View>
          <TextInput
            autoCapitalize="none"
            style={[styles.input, passwordError && styles.errorInput]}
            placeholder="Enter password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <View>
          <TouchableOpacity style={styles.buttonlogin} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={[styles.registerText]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 150,
    height: 113,
    margin: 10,
  },
  input: {
    borderColor: 'gray',
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    marginBottom: 20,
    padding: 10,
    height: 50,
    width: 322,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 8,
  },
  buttonlogin: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    height: 50,
    width: 322,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  registerContainer: {
    flexDirection: 'row',
  },
  registerText: {
    color: '#ADD8E6',
    marginLeft: 5,
    fontFamily: 'Roboto',
  },
});

export default Login;

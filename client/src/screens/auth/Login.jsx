import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../context/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = () => {
  const [state, setState] = useContext(AuthContext);
  const [inputEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isFocused = useIsFocused();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

      const userLoginData = {email: inputEmail, password: password};

      const response = await axios.post('/login', userLoginData);

      const responseData = response.data;
      setState(responseData);
      await AsyncStorage.setItem('@auth', JSON.stringify(responseData));
      console.log('Login Data->', {inputEmail, password});
      navigation.replace('MyTabs');
    } catch (error) {
      console.error('Error during login:', error);
      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
    }
  };

  const navigation = useNavigation();
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  // To check local storage
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem('@auth');
    console.log('Local Storage ->', data);
  };

  useEffect(() => {
    getLocalStorageData();
  }, []);

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
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
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
  eyeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
});

export default Login;

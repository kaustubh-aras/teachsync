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
  Dimensions,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../context/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

  const goToForgotPassword = () => {
    navigation.navigate('ResetPasswordRequestScreen');
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

          {/* "Forgot Password" text */}
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={goToForgotPassword}>
            <Text style={styles.registerText}>Forgot Password?</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    margin: windowHeight * 0.02,
  },
  input: {
    borderColor: 'gray',
    backgroundColor: '#1E1E1E',
    borderRadius: windowWidth * 0.05,
    marginBottom: windowHeight * 0.02,
    padding: windowHeight * 0.015,
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: windowWidth * 0.035,
    marginTop: windowHeight * -0.015,
    marginBottom: windowHeight * 0.008,
  },
  buttonlogin: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.05,
    marginBottom: windowHeight * 0.02,
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: windowWidth * 0.04,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  registerContainer: {
    flexDirection: 'row',
  },
  registerText: {
    color: '#ADD8E6',
    marginLeft: windowWidth * 0.01,
    fontFamily: 'Roboto',
  },
  eyeIcon: {
    position: 'absolute',
    top: windowHeight * 0.015,
    right: windowWidth * 0.05,
    zIndex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    bottom: windowHeight * 0.01,
    right: windowWidth * 0.01,
    margin: 5
  },
});

export default Login;

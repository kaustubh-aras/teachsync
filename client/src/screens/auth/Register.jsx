import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  Alert,
  Dimensions,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = () => {
  const [inputName, setName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const isFocused = useIsFocused();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Reset Errors when the component is focused again
    if (isFocused) {
      setName('');
      setInputEmail('');
      setPassword('');
      setInputPhoneNumber('');
    }
  }, [isFocused]);

  const handleRegister = async () => {
    try {
      // Reset errors
      setNameError('');
      setEmailError('');
      setPasswordError('');
      setPhoneError('');

      if (!inputName) {
        setNameError('Please enter your name');
        return;
      }

      if (!inputEmail) {
        setEmailError('Email address is required');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputEmail)) {
        setEmailError('Please enter a valid email address');
        return;
      }

      if (!password) {
        setPasswordError('Password is required');
        return;
      }

      const passwordValidate = password.length < 8 || password.length > 16;
      if (passwordValidate) {
        setPasswordError('Please enter a valid password (8-16 characters)');
        return;
      }

      if (!inputPhoneNumber) {
        setPhoneError('Phone number is required');
        return;
      }

      const userData = {
        name: inputName,
        email: inputEmail,
        password: password,
        phone: inputPhoneNumber,
      };

      const response = await axios.post('/register', userData);

      setName('');
      setInputEmail('');
      setPassword('');
      setInputPhoneNumber('');

      ToastAndroid.show('Registration Done Successfully ', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Failed', response.data.error);
      console.log(error);
    }
  };

  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
          <View>
            <TextInput
              autoCapitalize="words"
              style={[styles.input, nameError && styles.errorInput]}
              placeholder="Full Name"
              onChangeText={text => setName(text)}
              value={inputName}
              maxLength={20}
            />
            {nameError ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : null}
          </View>

          <View>
            <TextInput
              autoCapitalize="none"
              style={[styles.input, emailError && styles.errorInput]}
              placeholder="Email"
              onChangeText={text => setInputEmail(text)}
              value={inputEmail}
              keyboardType="email-address"
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>

          <View>
            <TextInput
              maxLength={16}
              autoCapitalize="none"
              style={[styles.input, passwordError && styles.errorInput]}
              placeholder="Password"
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
            <TextInput
              autoCapitalize="none"
              style={[styles.input, phoneError && styles.errorInput]}
              placeholder="Phone Number"
              onChangeText={text => setInputPhoneNumber(text)}
              value={inputPhoneNumber}
              keyboardType="numeric"
            />
            {phoneError ? (
              <Text style={styles.errorText}>{phoneError}</Text>
            ) : null}
          </View>

          {/* REGISTER BUTTON  */}
          <TouchableOpacity
            style={styles.buttonregister}
            onPress={handleRegister}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text style={[styles.loginText]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
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
  buttonregister: {
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
  loginContainer: {
    flexDirection: 'row',
  },
  loginText: {
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
});

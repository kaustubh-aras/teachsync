import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import axios from 'axios';

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

      const response = await axios.post(
        'http://192.168.0.103:3000/api/v1/auth/register',
        userData,
      );
      if (response.data.error) {
        Alert.alert('Registration Failed', response.data.error);
        return;
      }

      // setName('');
      // setInputEmail('');
      // setPassword('');
      // setInputPhoneNumber('');

      navigation.navigate('MyTabs');
    } catch (error) {
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              secureTextEntry={true}
            />
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
  buttonregister: {
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
  loginContainer: {
    flexDirection: 'row',
  },
  loginText: {
    color: '#ADD8E6',
    marginLeft: 5,
    fontFamily: 'Roboto'
  },
});

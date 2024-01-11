import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import axios from 'axios';

const Register = () => {
  const [inputName, setName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');

  function handleRegister() {
    console.log('Function Called');
    const userData = {
      name: inputName,
      email: inputEmail,
      password: password,
      phone: inputPhoneNumber,
    };

    axios
      .post('http://192.168.0.103:3000/register', userData)
      .then(res => console.log(res.data))
      .catch(e => console.log(e));
  }

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
          <TextInput
            autoCapitalize="words"
            style={styles.input}
            placeholder="Full Name"
            onChangeText={text => setName(text)}
            value={inputName}
            maxLength={20}
          />

          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setInputEmail(text)}
            value={inputEmail}
            keyboardType="email-address"
          />

          <TextInput
            maxLength={16}
            autoCapitalize="none"
            style={styles.input}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />

          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={text => setInputPhoneNumber(text)}
            value={inputPhoneNumber}
            keyboardType="numeric"
          />

          {/* REGISTER BUTTON  */}
          <Pressable style={styles.buttonregister} onPress={handleRegister}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>

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
  },
});

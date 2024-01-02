import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const Register = () => {
  const [inputName, setName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');

  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <TextInput
        autoCapitalize="words"
        style={styles.input}
        placeholder="Full Name"
        onChangeText={text => setName(text)}
        value={inputName}
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

      <Pressable style={styles.buttonregister}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </Pressable>

      <View style={styles.loginContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={[styles.loginText]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

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

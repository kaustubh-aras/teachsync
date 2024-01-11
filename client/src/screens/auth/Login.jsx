import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const Login = () => {
  const navigation = useNavigation();

  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // if (inputText === 'admin@gmail.com' && password === 'admin') {
      navigation.navigate('MyTabs');
  //   } else {
  //     Alert.alert(
  //       'Invalid Credentials',
  //       'Please enter valid email and password.',
  //     );
  //   }
  };

  const handleRegister = () => {
    navigation.navigate('Register')
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />

      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="Enter Email"
        onChangeText={text => setInputText(text)}
        value={inputText}
      />

      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="Enter password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <Pressable style={styles.buttonlogin} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </Pressable>

      <View style={styles.registerContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={[styles.registerText]}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  },
});

export default Login;

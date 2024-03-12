import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ResetPasswordRequestScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendRequest = async () => {
    try {
      const response = await axios.post('/forgot-password', { email });

      if (response.status === 200) {
        navigation.navigate('OTPVerificationScreen', { email });
      } else {
        Alert.alert('Error', response.data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Enter your email to reset the password</Text>
      <TextInput
        style={[styles.input, styles.emailInput]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendRequest}>
        <Text style={styles.buttonText}>Send Reset Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: windowWidth * 0.04,
    marginBottom: windowHeight * 0.03,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    borderRadius: windowWidth * 0.05,
    backgroundColor: '#1E1E1E',
    color: 'white',
    marginBottom: windowHeight * 0.02,
    padding: windowHeight * 0.015,
  },
  emailInput: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.05,
    height: windowHeight * 0.06,
    width: windowWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: windowWidth * 0.04,
    fontWeight: '700',
  },
});

export default ResetPasswordRequestScreen;

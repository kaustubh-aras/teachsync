import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OTPVerificationScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerifyOTP = async () => {
    const { email } = route.params;

    try {
      const response = await axios.post('/reset-password', {
        email,
        otp,
        newPassword,
        confirmPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', response.data.message, [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
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
      <Text style={styles.headerText}>Enter the OTP sent to your email and set a new password</Text>
      <TextInput
        style={[styles.input, styles.otpInput]}
        placeholder="OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={(text) => setOtp(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        style={[styles.input, styles.confirmPasswordInput]}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP and Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
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
  otpInput: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  confirmPasswordInput: {
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

export default OTPVerificationScreen;

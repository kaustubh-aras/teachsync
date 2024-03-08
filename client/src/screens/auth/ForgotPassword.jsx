import {StyleSheet, Text, View, useState} from 'react-native';
import React from 'react';

const ForgotPassword = () => {
  const [otp, setOtp] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>RESET PASSWORD</Text>
        <View>
          <TextInput 
          />
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

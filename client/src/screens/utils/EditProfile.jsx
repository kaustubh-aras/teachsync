import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EditProfile = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Edit Profile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

export default EditProfile;

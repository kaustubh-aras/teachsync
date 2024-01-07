import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import UserAvatar from 'react-native-user-avatar';


export default function Profile() {
  return (
    <View style={styles.container}>
      <UserAvatar size={100} name="Kaustubh Aras" src="https://dummyimage.com/100x100/000/fff" />
      <Pressable style={styles.editProfileButton}>
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: 100,
    height: 25,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  editProfileButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '400',
    paddingTop:2,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

export default function Profile() {
  const navigation = useNavigation();

  function goToEditProfile() {
    navigation.navigate('EditProfile');
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={styles.container1}>
        <Image
          source={require('../../assets/profile.jpeg')}
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            height: 100,
            width: 100,
            borderRadius: 85,
          }}
        />
        <Text style={styles.userName}>Kaustubh Aras</Text>

        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={goToEditProfile}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>FAQ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.logOutButton}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}>
            <Text style={styles.logOutButtonText}>LOGOUT</Text>
            <MaterialIcons size={15} style={styles.logOutIcon} name="logout" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 0,
    alignItems: 'center',
    marginTop: 65,
  },
  userName: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: '400',
    color: 'white',
  },
  editProfileButton: {
    margin: 25,
    borderColor: 'black',
    borderWidth: 1,
    width: 94,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'black',
  },
  editProfileButtonText: {
    width: 75,
    height: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    color: 'white',
  },
  profileButton: {
    width: 233,
    height: 63,
    margin: 25,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  container2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutButton: {
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    borderColor: 'white',
    gap: 5,
  },
  logOutButtonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  logOutIcon: {
    color: 'white',
  },
});

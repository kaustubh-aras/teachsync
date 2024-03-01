import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {AuthContext} from '../../../context/authContext';
import PushNotification from 'react-native-push-notification';

export default function Profile() {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();

  function goToEditProfile() {
    navigation.navigate('EditProfile');
  }

  const askToLogout = async () => {
    Alert.alert('Logout', 'Confirm Logout?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: Logout,
      },
    ]);
  };

  // Logout
  const Logout = async () => {
    // Cancels all Scheduled Notifications
    PushNotification.cancelAllLocalNotifications();

    setState({token: '', user: null});
    await AsyncStorage.removeItem('@auth');
    ToastAndroid.show('Logged Out Successfully', ToastAndroid.SHORT);
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

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
        <Text style={styles.userName}>{state?.user.name}</Text>

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
        <TouchableOpacity style={styles.logOutButton} onPress={askToLogout}>
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
    fontFamily: 'Koulen-Regular',
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
    fontStyle: 'normal',
    alignItems: 'center',
    fontSize: 15,
    fontFamily: 'Nunito-Light',
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
    fontFamily: 'Koulen-Regular',
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
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'white',
    marginTop: 3,
    marginRight: 2,
    marginLeft: 5,
  },
  logOutIcon: {
    color: 'white',
  },
});

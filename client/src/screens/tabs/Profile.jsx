import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import axios from 'axios';
import {AuthContext} from '../../../context/authContext';
import ImagePicker from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');

export default function Profile() {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);

  function goToEditProfile() {
    navigation.navigate('EditProfile');
  }

  function goToNotificationPage() {
    navigation.navigate('NotificationPage');
  }

  function goToFeedbackPage() {
    navigation.navigate('FeedbackPage');
  }

  function goToFAQPage() {
    navigation.navigate('FAQPage');
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

  const selectProfileImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    // Use ImagePicker.launchImageLibrary instead of ImagePicker.showImagePicker
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setProfileImage(source);

        // Send the selected image to backend
        saveProfileImage(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={selectProfileImage}>
          <Image
            source={
              profileImage ? profileImage : require('../../assets/profile.jpeg')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{state?.user.name}</Text>

        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={goToEditProfile}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={goToNotificationPage}>
          <Text style={styles.profileButtonText}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={goToFeedbackPage}>
          <Text style={styles.profileButtonText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton} onPress={goToFAQPage}>
          <Text style={styles.profileButtonText}>FAQ</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logOutButton} onPress={askToLogout}>
        <View style={styles.logoutButtonContent}>
          <Text style={styles.logOutButtonText}>LOGOUT</Text>
          <MaterialIcons size={15} style={styles.logOutIcon} name="logout" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    height: width * 0.4,
    width: width * 0.4,
    borderRadius: width * 0.2,
  },
  userName: {
    marginTop: height * 0.02,
    fontSize: width * 0.07,
    fontWeight: '400',
    color: 'white',
    fontFamily: 'Koulen-Regular',
  },
  editProfileButton: {
    marginVertical: height * 0.03,
    borderColor: 'black',
    borderWidth: 1,
    width: width * 0.5,
    height: height * 0.06,
    borderRadius: height * 0.03,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileButtonText: {
    fontSize: width * 0.04,
    color: 'black',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Nunito-Light',
  },
  profileButton: {
    width: width * 0.8,
    height: height * 0.08,
    marginVertical: height * 0.02,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: height * 0.04,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Koulen-Regular',
    fontSize: width * 0.05,
  },
  logOutButton: {
    width: width * 0.8,
    height: height * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: height * 0.04,
    borderWidth: 1,
    backgroundColor: 'black',
    borderColor: 'white',
    alignSelf: 'center',
  },
  logoutButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: width * 0.01,
  },
  logOutButtonText: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  logOutIcon: {
    color: 'white',
  },
});

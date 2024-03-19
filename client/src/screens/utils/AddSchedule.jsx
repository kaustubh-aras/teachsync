import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import PushNotification from 'react-native-push-notification';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const requestNotificationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'TeachSync App Notification Permission',
        message: 'TeachSync App needs access to your notifications',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use notifications');
    } else {
      console.log('Notification permission denied');
    }
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default function AddSchedule() {
  const [addtask, editAddTask] = useState('');
  const [adddescription, setAddDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [notificationPermissionGranted, setNotificationPermissionGranted] =
    useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    checkAndRequestPermissions();
    if (Platform.OS === 'android') {
      configureChannels();
    }
  }, []);

  const checkAndRequestPermissions = async () => {
    try {
      const granted = await requestNotificationPermission();
      setNotificationPermissionGranted(granted);
    } catch (err) {
      console.error('Error checking or requesting permissions:', err);
    }
  };

  const configureChannels = () => {
    PushNotification.createChannel({
      channelId: 'channel-id',
      channelName: 'Scheduled Notifications',
      channelDescription: 'Channel for scheduled notifications',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    });
  };

  const scheduleNotification = () => {
    if (!notificationPermissionGranted) {
      checkAndRequestPermissions();
      return;
    }

    if (!addtask || !adddescription) {
      Alert.alert('Empty Fields', 'Please enter both Title and Message');
      return;
    }

    const notificationDate = new Date(date);

    if (notificationDate <= new Date()) {
      Alert.alert('Invalid Date', 'Please select a future date and time');
      return;
    }

    PushNotification.localNotificationSchedule({
      title: addtask,
      message: adddescription,
      date: notificationDate,
      channelId: 'channel-id',
    });

    ToastAndroid.show('Notification Scheduled', ToastAndroid.SHORT);
    navigation.navigate('Scheduler');

    editAddTask('');
    setAddDescription('');
    setDate('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <Text style={styles.scheduleText}>Add Schedule</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              value={addtask}
              onChangeText={text => editAddTask(text)}
              style={styles.input}
              multiline={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              value={adddescription}
              style={styles.inputDescription}
              onChangeText={text => setAddDescription(text)}
              textAlignVertical="top"
            />
          </View>

          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
            <Text style={styles.label}>
              {`${String(date.getDate()).padStart(2, '0')}-${String(
                date.getMonth() + 1,
              ).padStart(
                2,
                '0',
              )}-${date.getFullYear()} ${date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}`}
            </Text>
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={selectedDate => {
              setOpen(false);
              setDate(selectedDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <View style={styles.mainButtonContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={scheduleNotification}>
              <Text style={styles.scheduleButton}>SCHEDULE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scheduleText: {
    width: '100%',
    height: height * 0.1,
    textAlign: 'center',
    fontFamily: 'Koulen-Regular',
    color: 'white',
    fontSize: width * 0.06,
    fontStyle: 'normal',
    fontWeight: '400',
    marginTop: height * 0.05,
  },
  inputContainer: {
    marginTop: height * 0.02,
  },
  label: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: '300',
    fontFamily: 'Poppins-Medium',
  },
  input: {
    width: '100%',
    height: height * 0.05,
    borderRadius: width * 0.02,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    marginTop: height * 0.01,
    paddingLeft: '3%',
    paddingBottom: '1%',
    paddingTop: '2%',
    fontFamily: 'Poppins-Regular',
  },
  inputDescription: {
    width: '100%',
    height: height * 0.15,
    borderRadius: width * 0.02,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    marginTop: height * 0.01,
    paddingLeft: '2%',
    paddingBottom: '1%',
    fontFamily: 'Poppins-Regular',
  },
  datePickerContainer: {
    flex: 1,
    marginTop: height * 0.03,
    borderColor: 'white',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.02,
    borderWidth: 1,
  },
  datePicker: {
    width: width * 0.8,
    height: height * 0.2,
    backgroundColor: 'black',
    marginTop: height * 0.02,
  },
  mainButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    width: width * 0.6,
    height: height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: width * 0.04,
    borderWidth: 1,
    marginHorizontal: width * 0.1,
    marginBottom: height * 0.05,
  },
  scheduleButton: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});

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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import PushNotification from 'react-native-push-notification';
import {request, PERMISSIONS} from 'react-native-permissions';

export default function AddSchedule() {
  const [addtask, editAddTask] = useState('');
  const [adddescription, setAddDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    checkAndRequestPermissions();

    // Check if the platform is Android before configuring channels
    if (Platform.OS === 'android') {
      configureChannels();
    }
  }, []);

  const checkAndRequestPermissions = async () => {
    try {
      const scheduleExactAlarmResult = await request(
        PERMISSIONS.ANDROID.SCHEDULE_EXACT_ALARM,
      );
      const useExactAlarmResult = await request(
        PERMISSIONS.ANDROID.USE_EXACT_ALARM,
      );
      const receiveBootCompletedResult = await request(
        PERMISSIONS.ANDROID.RECEIVE_BOOT_COMPLETED,
      );
      const vibrateResult = await request(PERMISSIONS.ANDROID.VIBRATE);
    } catch (err) {
      console.error('Error checking or requesting permissions:', err);
    }
  };

  const configureChannels = () => {
    PushNotification.createChannel({
      channelId: 'channel-id', // Change this to a unique ID
      channelName: 'Scheduled Notifications',
      channelDescription: 'Channel for scheduled notifications',
      soundName: 'default',
      importance: 4, // High importance (5 is maximum, 1 is minimum)
      vibrate: true,
    });
  };

  const scheduleNotification = () => {
    // Checks for Empty Inputs and Alerts the user
    if (!addtask || !adddescription) {
      Alert.alert('Empty Fields', 'Please enter both Title and Message');
      return; // Stop execution if either title or message is empty
    }

    // Set the notification date to the selected date
    const notificationDate = new Date(selectedDate);

    if (notificationDate <= new Date()) {
      Alert.alert('Invalid Date', 'Please select a future date and time');
      return; // Stop execution if the date is in the past
    }

    // Schedule the notification with the specified channel ID
    PushNotification.localNotificationSchedule({
      title: addtask,
      message: adddescription,
      date: notificationDate,
      channelId: 'channel-id', // Use the same channel ID as configured
    });

    ToastAndroid.show('Notification Scheduled', ToastAndroid.SHORT);
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.mainContainer}>
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

            <View
              style={{
                flex: 1,
                marginTop: 30,
                borderColor: 'white',
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                borderWidth: 1,
              }}>
              <DatePicker
                androidVariant="nativeAndroid"
                textColor="white"
                style={{
                  width: 300,
                  height: 150,
                  backgroundColor: 'black',
                  flex: 1,
                  marginTop: 20,
                }}
                date={selectedDate}
                mode="datetime"
                placeholder="Select Date and Time"
                format="YYYY-MM-DD HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={date => setSelectedDate(new Date(date))}
              />
            </View>

            <View style={styles.mainButtonContainer}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={scheduleNotification}>
                <Text style={styles.scheduleButton}>SCHEDULE</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scheduleText: {
    width: '100%',
    height: 50,
    textAlign: 'center',
    fontFamily: 'Koulen-Regular',
    color: 'white',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '400',
    marginTop: 30,
  },
  inputContainer: {
    marginTop: 25,
  },
  label: {
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
    fontFamily: 'Poppins-Medium',
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    marginTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  inputDescription: {
    width: '100%',
    height: 180,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    marginTop: 5,
    paddingLeft: 10,
    paddingBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  mainButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  scheduleButton: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});

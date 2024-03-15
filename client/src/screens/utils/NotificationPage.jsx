import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const NotificationPage = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    const result = await check(
      Platform.select({
        android: PERMISSIONS.ANDROID.NOTIFICATIONS,
        ios: PERMISSIONS.IOS.NOTIFICATIONS,
      })
    );
    if (result === RESULTS.GRANTED) {
      setNotificationEnabled(true);
    } else {
      setNotificationEnabled(false);
    }
  };

  const requestNotificationPermission = async () => {
    const result = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.NOTIFICATIONS,
        ios: PERMISSIONS.IOS.NOTIFICATIONS,
      })
    );
    if (result === RESULTS.GRANTED) {
      setNotificationEnabled(true);
    } else {
      setNotificationEnabled(false);
    }
  };

  const handleNotificationToggle = () => {
    if (!notificationEnabled) {
      requestNotificationPermission();
    } else {
      setNotificationEnabled(false);
      PushNotification.cancelAllLocalNotifications();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notification Settings</Text>
      <View style={styles.notificationToggle}>
        <Text style={styles.toggleText}>Enable Notifications</Text>
        <Switch
          value={notificationEnabled}
          onValueChange={handleNotificationToggle}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotificationPage;

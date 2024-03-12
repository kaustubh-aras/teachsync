import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../../../context/authContext';
import {useNavigation} from '@react-navigation/native';

export default function MonthlyReport() {
  const navigation = useNavigation();
  const [totalLectures, setTotalLectures] = useState(0);

  const [authState] = useContext(AuthContext);
  const {user, token} = authState;

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user && token) {
      fetchDailyReport();
    }
  }, [user, token]);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(`/users/${user._id}/daily-reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setTotalLectures(response.data.totalLectures);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchDailyReport = async () => {
    try {
      const response = await axios.get(`/users/${user._id}/daily-reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setTotalLectures(response.data.totalLectures);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const goToAllMonthlyReport = () => {
    navigation.navigate('AllMonthlyReport');
  };
  const goToFYIT = () => {
    navigation.navigate('FYITMonthlyReport');
  };
  const goToFYCS = () => {
    navigation.navigate('FYCSMonthlyReport');
  };
  const goToSYIT = () => {
    navigation.navigate('SYITMonthlyReport');
  };
  const goToSYCS = () => {
    navigation.navigate('SYCSMonthlyReport');
  };
  const goToTYIT = () => {
    navigation.navigate('TYITMonthlyReport');
  };
  const goToTYCS = () => {
    navigation.navigate('TYCSMonthlyReport');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={styles.totalLecturesText}>
        Total Number of Lectures taken: {totalLectures}
      </Text>

      <TouchableOpacity style={styles.button} onPress={goToAllMonthlyReport}>
        <Text style={styles.buttonText}>All Monthly Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToFYIT}>
        <Text style={styles.buttonText}>FYIT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToFYCS}>
        <Text style={styles.buttonText}>FYCS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToSYIT}>
        <Text style={styles.buttonText}>SYIT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToSYCS}>
        <Text style={styles.buttonText}>SYCS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToTYIT}>
        <Text style={styles.buttonText}>TYIT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToTYCS}>
        <Text style={styles.buttonText}>TYCS</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  totalLecturesText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

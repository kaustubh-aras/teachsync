import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../../../context/authContext';

export default function TYCSMonthlyReport() {
  const [dailyReports, setDailyReports] = useState([]);
  const [totalLectures, setTotalLectures] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [authState] = useContext(AuthContext);
  const {user, token} = authState;

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        `/users/${user._id}/daily-reports?course=TYCS`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const {
        dailyReports: fetchedDailyReports,
        totalLectures: fetchedTotalLectures,
      } = response.data;

      setDailyReports(fetchedDailyReports);
      setTotalLectures(fetchedTotalLectures);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchDailyReport();
    }
  }, [user, token]);

  const fetchDailyReport = async () => {
    try {
      const response = await axios.get(
        `/users/${user._id}/daily-reports?course=TYCS`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const {
        dailyReports: fetchedDailyReports,
        totalLectures: fetchedTotalLectures,
      } = response.data;

      setDailyReports(fetchedDailyReports);
      setTotalLectures(fetchedTotalLectures);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderDailyReportItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Date: {item.date}</Text>
      <Text style={styles.cardText}>Lectures: {item.lectures}</Text>
      <Text style={styles.cardText}>Division: {item.division}</Text>
      <Text style={styles.cardText}>Course: {item.course}</Text>
      <Text style={styles.cardText}>Subject: {item.subject}</Text>
      <Text style={styles.cardText}>Topic: {item.topics.join(', ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.totalLecturesContainer}>
        <Text style={styles.totalLectures}>
          Total Sum of Lectures: {totalLectures}
        </Text>
      </View>

      <FlatList
        data={dailyReports}
        keyExtractor={item => item._id}
        renderItem={renderDailyReportItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  totalLecturesContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  totalLectures: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  cardText: {
    color: '#333',
    fontSize: 16,
    marginBottom: 5,
  },
});

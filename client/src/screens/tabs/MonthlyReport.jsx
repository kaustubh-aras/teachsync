import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Modal,
} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../../../context/authContext';

export default function MonthlyReport() {
  const [dailyReports, setDailyReports] = useState([]);
  const [totalLectures, setTotalLectures] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [authState] = useContext(AuthContext);
  const {user, token} = authState;

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(`/users/${user._id}/daily-reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

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

  const openModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (user && token) {
      fetchDailyReport();
    }
  }, [user, token]);

  const fetchDailyReport = async () => {
    try {
      const response = await axios.get(`/users/${user._id}/daily-reports`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

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
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.box}>
        <Text>Date: {item.date}</Text>
        <Text>Lectures: {item.lectures}</Text>
        <Text>Division: {item.division}</Text>
        <Text>Course: {item.course}</Text>
        <Text>Subject: {item.subject}</Text>
        <Text>Topic: {item.topics.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={{backgroundColor: 'black'}}>
        Total Sum of Lectures: {totalLectures}
      </Text>

      <FlatList
        data={dailyReports}
        keyExtractor={item => item._id}
        renderItem={renderDailyReportItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Modal for displaying selected item */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <Text>Date: {selectedItem?.date}</Text>
          <Text>Lectures: {selectedItem?.lectures}</Text>
          <Text>Division: {selectedItem?.division}</Text>
          <Text>Course: {selectedItem?.course}</Text>
          <Text>Subject: {selectedItem?.subject}</Text>
          <Text>Topic: {selectedItem?.topics.join(', ')}</Text>

          <TouchableOpacity onPress={closeModal}>
            <Text style={{color: 'blue', marginTop: 10}}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    height: 150,
    backgroundColor: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
});

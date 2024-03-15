import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../../../context/authContext';
import {useNavigation} from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import {encode} from 'base64-arraybuffer';
import Octicons from 'react-native-vector-icons/Octicons';

const {width, height} = Dimensions.get('window'); // Define width and height

export default function MonthlyReport() {
  const navigation = useNavigation();
  const [totalLectures, setTotalLectures] = useState(0);

  const [authState] = useContext(AuthContext);
  const {user, token} = authState;

  const [refreshing, setRefreshing] = useState(false);

  const confirmDownload = () => {
    Alert.alert('Download Excel', 'Confirm Download', [
      {
        text: 'no',
      },
      {
        text: 'yes',
        onPress: handleDownload,
      },
    ]);
  };

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

  // To download the Excel
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `/users/${user._id}/daily-reports/download-excel`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        },
      );

      const arrayBuffer = response.data;
      const base64String = encode(arrayBuffer);

      const path = `${RNFetchBlob.fs.dirs.DownloadDir}/daily_reports.xlsx`;

      // Write the file to the device storage
      await RNFetchBlob.fs.writeFile(path, base64String, 'base64');

      Alert.alert(
        'Download Complete',
        'The daily reports file has been downloaded successfully.',
      );
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert(
        'Error',
        'An error occurred while downloading the daily reports file.',
      );
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

      {/* Add the download button */}
      <TouchableOpacity style={styles.downloadButton} onPress={confirmDownload}>
        <View style={styles.downloadButtonContent}>
          <Text style={styles.downloadButtonText}>Download Excel</Text>
          <Octicons size={15} style={styles.downloadIcon} name="download" />
        </View>
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
  downloadIcon: {
    color: 'white',
  },
  downloadButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  downloadButton: {
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: 'black',
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
  },
  downloadButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginLeft: 5,
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/authContext';

export default function DailyReport() {
  const [serialNumber, setSerialNumber] = useState('');
  const [division, setDivision] = useState('');
  const [lecture, setLecture] = useState('');
  const [course, setCourse] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');

  const [authState] = useContext(AuthContext);
  const {user, token} = authState;

  const saveDailyReport = async () => {
    try {
      if (
        !(serialNumber && division && lecture && course && subject && topic)
      ) {
        Alert.alert('Empty Field', 'Please fill in all the fields.');
        return;
      }

      const response = await axios.post(
        `/users/${user._id}/daily-reports`,
        {
          serialNumber: parseInt(serialNumber),
          lectures: parseInt(lecture),
          subject,
          topics: topic,
          course,
          division,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Daily report saved', response.data);
      Alert.alert('Saved', 'Done');
    } catch (error) {
      console.error('Error saving daily report', error);

      if (error.response && error.response.status === 500) {
        Alert.alert(
          'Duplicate Serial Number',
          'Please pick a unique Serial Number',
        );
      } else {
        console.error('Unhandled error:', error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Text style={styles.labelText}>ADD DAILY REPORT</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Sr. No</Text>
          <TextInput
            value={serialNumber}
            onChangeText={text => setSerialNumber(text)}
            style={[styles.input, {color: 'white'}]}
          />
          <Text style={styles.label}>Division</Text>
          <TextInput
            value={division}
            onChangeText={text => setDivision(text)}
            style={styles.input}
          />
          <Text style={styles.label}>Lecture</Text>
          <TextInput
            value={lecture}
            onChangeText={text => setLecture(text)}
            style={styles.input}
          />
          <Text style={styles.label}>Course</Text>
          <TextInput
            value={course}
            onChangeText={text => setCourse(text)}
            style={styles.input}
          />
          <Text style={styles.label}>Subject</Text>
          <TextInput
            value={subject}
            onChangeText={text => setSubject(text)}
            style={styles.input}
          />
          <Text style={styles.label}>Topic</Text>
          <TextInput
            value={topic}
            onChangeText={text => setTopic(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.mainButtonContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={saveDailyReport}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
    fontFamily: 'Poppins-Medium',
  },
  labelText: {
    color: 'white',
    fontFamily: 'Koulen-Regular',
    fontSize: 25,
    marginTop: 15,
  },
  inputContainer: {
    flex: 1,
    color: 'white',
  },
  input: {
    width: 300,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    padding: 10,
  },
  mainButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  saveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});

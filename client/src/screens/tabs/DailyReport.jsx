import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context/authContext';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';

const {width, height} = Dimensions.get('window');

export default function DailyReport() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [division, setDivision] = useState('');
  const [lecture, setLecture] = useState('');
  const [selectedCourse, setSelectedCourse] = useState();
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');

  const [authState] = useContext(AuthContext);
  const {user, token} = authState;

  const confirmToSave = () => {
    if (!(division && lecture && selectedCourse && subject && topic)) {
      Alert.alert('Empty Field', 'Please fill in all the fields.');
      return;
    }
    Alert.alert('Confirmation', 'Are you sure you want to save', [
      {
        text: 'Yes',
        onPress: saveDailyReport,
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };

  const saveDailyReport = async () => {
    try {
      if (!(division && lecture && selectedCourse && subject && topic)) {
        Alert.alert('Empty Field', 'Please fill in all the fields.');
        return;
      }

      const response = await axios.post(
        `/users/${user._id}/daily-reports`,
        {
          date: date,
          lectures: parseInt(lecture),
          subject,
          topics: topic,
          course: selectedCourse,
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

      // Clears Input Box After Clicking on Save
      setDivision('');
      setLecture('');
      setSubject('');
      setTopic('');
      setSelectedCourse('');
    } catch (error) {
      console.error('Error saving daily report', error);
      Alert.alert('Error', 'Please Try Again');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.labelText}>ADD DAILY REPORT</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
            <Text style={styles.label}>
              {`${date.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })} ${date.toLocaleTimeString('en-IN', {
                hour12: true,
                timeZone: 'Asia/Kolkata',
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
            keyboardType="number-pad"
            placeholder="Total no. of lectures"
          />
          <Text style={styles.label}>Course</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={selectedCourse}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCourse(itemValue)
              }>
              <Picker
                label="Select Course"
                value=""
                style={{color: '#A9A9A9'}}
              />
              <Picker.Item label="TYIT" value="TYIT" />
              <Picker.Item label="TYCS" value="TYCS" />
              <Picker.Item label="SYIT" value="SYIT" />
              <Picker.Item label="SYCS" value="SYCS" />
              <Picker.Item label="FYIT" value="FYIT" />
              <Picker.Item label="FYCS" value="FYCS" />
            </Picker>
          </View>
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
            onPress={confirmToSave}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  label: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: '300',
    fontFamily: 'Poppins-Medium',
  },
  labelText: {
    color: 'white',
    fontFamily: 'Koulen-Regular',
    fontSize: width * 0.06,
    marginTop: height * 0.02,
  },
  inputContainer: {
    flex: 1,
    color: 'white',
    width: width * 0.9,
  },
  input: {
    width: '100%',
    height: height * 0.05,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#1E1E1E',
    padding: 10,
    marginBottom: height * 0.02,
  },
  mainButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9,
    height: height * 0.07,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: height * 0.02,
  },
  saveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  pickerContainer: {
    width: '100%',
    height: height * 0.05,
    borderRadius: 5,
    borderWidth: 1,
    width: width * 0.9,
    overflow: 'hidden',
    marginBottom: height * 0.02,
  },
  picker: {
    width: 200,
    height: '100%',
    backgroundColor: '#1E1E1E',
    marginTop: -7,
    marginLeft: -7,
  },
});

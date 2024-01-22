import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const EditProfile = () => {
  const [editname, setEditName] = useState('TeachSync');
  const [editemail, setEditEmail] = useState('teachsync@gmail.com');
  const [editphone, setEditPhone] = useState('12345678910');
  const [editcourse, setEditCourse] = useState('BSC - IT');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput editable={false} value={editname} style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={editemail}
            onChangeText={text => setEditEmail(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={editphone}
            onChangeText={text => setEditPhone(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Course</Text>
          <TextInput
            value={editcourse}
            onChangeText={text => setEditCourse(text)}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.mainButtonContainer}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 15,
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
    fontFamily: 'Poppins-Light',
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

export default EditProfile;

import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import {AuthContext} from '../../../context/authContext';
import axios from 'axios';

const EditProfile = () => {
  const [state, setState] = useContext(AuthContext);
  const [editname, setEditName] = useState(state?.user.name);
  const [editemail] = useState(state?.user.email);
  const [editpassword, setPassword] = useState(state?.user.password);
  const [editphone, setEditPhone] = useState(state?.user.phone);

  const confirmToSave = () => {
    Alert.alert('Confirmation', 'Are you sure you want to save?', [
      {
        text: 'Yes',
        onPress: handleSave,
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };

  const handleSave = async () => {
    try {
      const {data} = await axios.put(
        '/update',
        {
          name: editname,
          email: editemail,
          password: editpassword,
          phone: editphone,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        },
      );
      let userData = JSON.stringify(data);
      setState({...state, user: userData?.updatedUser});
      ToastAndroid.show(
        'User Profile Updated Successfully',
        ToastAndroid.SHORT,
      );
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                value={editname}
                onChangeText={text => setEditName(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={editemail}
                style={styles.input}
                editable={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={editpassword}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry={true}
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
          </View>
          <View style={styles.mainButtonContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={confirmToSave}>
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  mainContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
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

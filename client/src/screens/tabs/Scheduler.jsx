import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Scheduler() {
  const navigation = useNavigation();

  const goToAddSchedule = () => {
    navigation.navigate('AddSchedule');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.button} onPress={goToAddSchedule}>
            <Text style={styles.buttonText}>Add Schedule</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black', // Background color
    padding: 10,
    borderRadius: windowWidth * 0.05,
    borderWidth: 1,
    borderColor: 'white', // Border color
    marginBottom: windowHeight * 0.02,
  },
  buttonText: {
    color: '#fff',
    fontSize: windowWidth * 0.04,
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
  },
});

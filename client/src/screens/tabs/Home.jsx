import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../../../context/authContext';
import {CommonActions, useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const [state, setState] = useContext(AuthContext);
  const navigation = useNavigation();

  const goToDailyReportTab = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'MyTabs', // Name of your bottom tab navigator
        params: {
          screen: 'Daily Report', // Name of the tab you want to navigate to
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.headerText}>Home</Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.welcomeText}>Welcome {state?.user.name}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={goToDailyReportTab}>
          <Text style={styles.buttonText}>Add Reports</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  topSection: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
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
    backgroundColor: 'black', // Background color of the button
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16, // Adjust the font size as needed
  },
});

export default Home;

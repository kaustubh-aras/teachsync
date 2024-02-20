import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../../context/authContext';

export default function Home() {
  const [state] = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Home</Text>
      <Text>{JSON.stringify(state, null, 4)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function DailyReport() {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Daily Reporttt</Text>
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

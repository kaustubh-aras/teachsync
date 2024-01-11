import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Scheduler() {
  return (
    <View style={styles.container}>
      <Text style={{color:'white'}}>Scheduler</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
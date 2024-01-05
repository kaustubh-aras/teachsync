import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Scheduler() {
  return (
    <View style={styles.container}>
      <Text style={{color:'black'}}>Scheduler</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
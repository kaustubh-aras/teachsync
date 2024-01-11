import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function MonthlyReport() {
  return (
    <View style={styles.container}>
      <Text style={{color:'white'}}>Monthly Report</Text>
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
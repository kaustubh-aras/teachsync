import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function MonthlyReport() {
  return (
    <View style={styles.container}>
      <Text style={{color:'black'}}>Monthly Report</Text>
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
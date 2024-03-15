import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function FeedbackPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Coming soon: Feedback feature! Stay tuned for updates.
      </Text>
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
  text: {
    fontSize: 16,
    fontFamily: 'Koulen-Regular',
  },
});

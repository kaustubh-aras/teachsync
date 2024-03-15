import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function FAQPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAQ</Text>
      <View style={styles.question}>
        <Text style={styles.questionText}>What is this app about?</Text>
        <Text style={styles.answer}>
          This app is designed for educators to log their daily reports and
          track their teaching progress, aiding in the monitoring of student
          learning outcomes.
        </Text>
      </View>
      <View style={styles.question}>
        <Text style={styles.questionText}>How was this app developed?</Text>
        <Text style={styles.answer}>
          The app was developed using React Native for the frontend, while
          Express.js, Node.js, and MongoDB were utilized for the backend and
          database functionalities.
        </Text>
      </View>
      <View style={styles.question}>
        <Text style={styles.questionText}>Future Scope</Text>
        <Text style={styles.answer}>
          This app will continue to receive updates and enhancements,
          introducing new features and improvements to provide an even better
          user experience.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Koulen-Regular',
  },
  question: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Koulen-Regular',
  },
  answer: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
});

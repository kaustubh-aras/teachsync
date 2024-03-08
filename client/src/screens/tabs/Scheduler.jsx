import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Scheduler() {
  const navigation = useNavigation();

  const goToAddSchedule = () => {
    navigation.navigate('AddSchedule');
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'black',
      }}>
      <Button title="AddSchedule" onPress={goToAddSchedule} />
    </View>
  );
}

const styles = StyleSheet.create({});

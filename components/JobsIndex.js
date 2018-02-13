import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import axios from 'axios'

export default class JobsIndex extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          This is jobs index
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
  },
  heading: {
    borderWidth: 1,
  }
});

import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const JobInfoRow = ({ label, content }) => (
  <View style={styles.row}>
    <Text style={styles.label}>
      { label }
    </Text>
    <Text style={styles.content}>
      { content }
    </Text>
  </View>
)

export default JobInfoRow

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    width: '20%',
  },
  content: {
    width: '75%',
  }
});

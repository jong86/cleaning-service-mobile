import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const JobInfoRow = ({ label, content }) => (
  <View style={styles.row}>
    <View style={styles.label}>
      <Text style={styles.labelText}>
        { label }
      </Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.contentText}>
        { content }
      </Text>
    </View>
  </View>
)

export default JobInfoRow

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'gainsboro',
    padding: 4,
  },
  label: {
    borderBottomWidth: 1,
    borderColor: 'silver',
    width: '100%',
    padding: 4,
  },
  labelText: {
    fontWeight: 'bold',
  },
  content: {
    width: '100%',
    padding: 4,
  }
});

import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const JobInfoRow = ({ label, content }) => (
  <View style={[styles.row, { marginBottom: label !==  'Your notes' ? 16 : 0 }]}>
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
    backgroundColor: 'white',
    padding: 8,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'silver',
  },
  label: {
    borderBottomWidth: 1,
    borderColor: 'gainsboro',
    alignSelf: 'stretch',
    padding: 4,
  },
  labelText: {
    fontWeight: 'bold',
  },
  content: {
    alignSelf: 'stretch',
    padding: 4,
  }
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Loading = () => (
  <View style={styles.container}>
    Loading...
  </View>
)

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    width: '100%',
    padding: 64,
  },
});

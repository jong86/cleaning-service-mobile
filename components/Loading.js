import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Loading = () => (
  <View style={styles.container}>
    <Text>
      Loading
    </Text>
  </View>
)

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 64,

    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

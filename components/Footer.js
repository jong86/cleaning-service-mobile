import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the footer</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: 'gainsboro',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const Button = ({ text }) => (
  <View style={styles.button}>
    <Text>
      { text }
    </Text>
  </View>
)

export default Button

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    width: '75%',
    backgroundColor: 'red',
    padding: 4,
  },
});

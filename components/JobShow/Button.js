import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const Button = ({ onPress, text }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.button}>
      <Text style={styles.text}>
        { text }
      </Text>
    </View>
  </TouchableWithoutFeedback>
)

export default Button

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: 64,
    backgroundColor: 'green',
    padding: 16,
  },
  text: {
    color: 'white',
    fontSize: 16,
  }
});

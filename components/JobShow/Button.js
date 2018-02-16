import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const Button = ({ onPress, text, color }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={[styles.button, { backgroundColor: color }]}>
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
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
  }
});

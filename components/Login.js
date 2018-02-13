import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: 'username',
      password: 'password',
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    alert(`You submitted:\n${this.state.username}\nand\n${this.state.password}`)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Log in
        </Text>

        <Text style={styles.label}>
          Username
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />

        <Text style={styles.label}>
          Password
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <TouchableWithoutFeedback
          onPress={this.onSubmit}
        >
          <View style={styles.button}>
            <Text>
              SUBMIT
            </Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );
  }
}

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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'gainsboro',
    padding: 8,
    width: 128,
  },

});

import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import axios from 'axios'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: 'roy_boyer@yahoo.com',
      password: 'password',
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit() {
    try {
      const request = axios.post('http://192.168.1.69:3000/authenticate', {
        email: this.state.email,
        password: this.state.password,
      })
      const response = await request
      const authToken = response.data.auth_token

      this.props.setAuthToken(authToken)

    } catch (error) {
      // console.warn(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Log in
        </Text>

        <Text style={styles.label}>
          E-mail
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
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

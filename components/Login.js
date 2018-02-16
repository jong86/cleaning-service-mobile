import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { action } from '../redux/action.js'
import { connect } from 'react-redux'

import axios from 'axios'



class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: 'rosetta@gmail.com',
      password: 'password',
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit() {
    this.props.setIsLoading(true)

    try {
      const request = axios.post('http://192.168.1.69:3000/authenticate', {
        email: this.state.email,
        password: this.state.password,
      })
      const response = await request

      const { auth_token: authToken, user_data: userData } = response.data
      console.log("user data from login", userData)
      this.props.setUserData(userData)
      this.props.setAuthToken(authToken)

    } catch (error) {
      this.props.setIsLoading(false)
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


function mapDispatchToProps(dispatch) {
  return {
    setIsLoading: (isLoading) => {
      dispatch(action('SET_IS_LOADING', { isLoading }))
    },
    setUserData: (userData) => {
      dispatch(action('SET_USER_DATA', { userData }))
    },
  }
}

Login = connect(null, mapDispatchToProps)(Login)

export default Login



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
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

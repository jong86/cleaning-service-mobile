import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import axios from 'axios'

export default class JobsIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      jobsList: [],
    }

    this.fetchJobsList = this.fetchJobsList.bind(this)
  }

  componentWillMount() {
    this.fetchJobsList()
  }

  async fetchJobsList() {
    try {
      const config = {
        headers: { Authorization: this.props.authToken }
      }

      const request = axios.get('http://192.168.1.69:3000/employee/jobs', config)
      const response = await request
      // alert(JSON.stringify(response.data.jobs))
      this.setState({ jobsList: response.data.jobs })

    } catch (error) {
      console.warn(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          This is jobs index
        </Text>
        <Text>
          { JSON.stringify(this.state.jobsList) }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
  },
  heading: {
    borderWidth: 1,
  }
});

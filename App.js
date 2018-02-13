import React from 'react'
import { AsyncStorage } from 'react-native'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import Footer from './components/Footer.js'
import Login from './components/Login.js'
import JobsIndex from './components/JobsIndex.js'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authToken: null,
    }

    this.setAuthToken = this.setAuthToken.bind(this)
    this.getAuthToken = this.getAuthToken.bind(this)
  }

  componentWillMount() {
    this.getAuthToken()
  }

  async setAuthToken(authToken) {
    // Save token in storage
    try {
      await AsyncStorage.setItem('@Storage:authToken', authToken)
      this.setState({ authToken })
    } catch (error) {
      // console.warn("error setting", error)
    }
  }

  async getAuthToken() {
    // Get token from storage
    try {
      const authToken = await AsyncStorage.getItem('@Storage:authToken')
      if (authToken !== null){
        this.setState({ authToken })
      }
    } catch (error) {
      // console.warn("error getting", error)
    }
  }

  render() {
    const { authToken } = this.state

    return (
      <View style={styles.outerContainer}>
        { !authToken &&
          <Login setAuthToken={this.setAuthToken}/>
        }
        { authToken &&
          <View style={styles.innerContainer}>
            <ScrollView style={styles.scrollView}>
              <JobsIndex/>
            </ScrollView>
            <Footer/>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'pink',
  },
  scrollView: {
    height: '100%',
    borderWidth: 1,
    borderColor: 'lime',
  }
});

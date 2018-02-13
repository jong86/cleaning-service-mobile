import React from 'react'
import { AsyncStorage } from 'react-native'
import { Platform, StyleSheet, ScrollView, StatusBar, Text, View } from 'react-native'
import Footer from './components/Footer.js'
import Login from './components/Login.js'
import JobsIndex from './components/JobsIndex.js'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      authToken: null,
      currentView: 'JobsIndex'
    }

    this.setAuthToken = this.setAuthToken.bind(this)
    this.getAuthToken = this.getAuthToken.bind(this)
    this.clearAuthToken = this.clearAuthToken.bind(this)

    this.showCurrentView = this.showCurrentView.bind(this)
  }

  componentWillMount() {
    this.getAuthToken()
  }


  /*=================
    Authentication
  ================*/
  async setAuthToken(authToken) {
    // Save token in storage
    try {
      await AsyncStorage.setItem('@Storage:authToken', authToken)
      this.setState({ isLoggedIn: true })
    } catch (error) {
      // console.warn("error setting", error)
    }
  }

  async getAuthToken() {
    // Get token from storage
    try {
      const authToken = await AsyncStorage.getItem('@Storage:authToken')
      if (authToken !== null) {
        this.setState({ isLoggedIn: true, authToken: authToken })
      }
    } catch (error) {
      // console.warn("error getting", error)
    }
  }

  async clearAuthToken() {
    // Remove token from storage
    try {
      const authToken = await AsyncStorage.removeItem('@Storage:authToken')
      this.setState({ isLoggedIn: false })
    } catch (error) {
      // console.warn("error clearing", error)
    }
  }


  /*============
    Rendering
  ===========*/
  showCurrentView() {
    const { authToken, currentView } = this.state
    switch (currentView) {
      case 'JobsIndex': return <JobsIndex authToken={authToken}/>
      case 'JobShow': return null
      case 'Profile': return null
    }
  }

  render() {
    const { isLoggedIn } = this.state
    const { setAuthToken, clearAuthToken, showCurrentView } = this

    return (
      <View style={styles.outerContainer}>
        { !isLoggedIn &&
          <Login setAuthToken={setAuthToken}/>
        }
        { isLoggedIn &&
          <View style={styles.innerContainer}>
            <View style={styles.statusBarSpacer}/>

            <ScrollView style={styles.scrollView}>
              { showCurrentView() }
            </ScrollView>

            <Footer
              clearAuthToken={clearAuthToken}
            />
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
  },
  statusBarSpacer: {
    // Make it the same height as the status bar
    height: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
  }
});

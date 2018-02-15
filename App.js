import React from 'react'
import { AsyncStorage } from 'react-native'
import { Platform, StyleSheet, ScrollView, StatusBar, Text, View } from 'react-native'

import { Provider } from 'react-redux'
import store from './redux/store'
import { action } from './redux/action.js'
import { connect } from 'react-redux'

import Footer from './components/Footer.js'
import Login from './components/Login.js'
import JobsIndex from './components/JobsIndex/JobsIndex.js'
import JobShow from './components/JobShow/JobShow.js'
import Loading from './components/Loading.js'



class App extends React.Component {
  constructor() {
    super()

    this.setAuthToken = this.setAuthToken.bind(this)
    this.getAuthTokenFromStorage = this.getAuthTokenFromStorage.bind(this)
    this.clearAuthToken = this.clearAuthToken.bind(this)

    this.showCurrentView = this.showCurrentView.bind(this)
  }

  componentWillMount() {
    this.getAuthTokenFromStorage()
  }



  /*=================
    Authentication
  ================*/

  async setAuthToken(authToken) {
    // Save token in storage
    try {
      await AsyncStorage.setItem('@Storage:authToken', authToken)
      this.props.setAuthToken(authToken)
    } catch (error) {
      console.warn("error setting", error)
    }
  }

  async getAuthTokenFromStorage() {
    // Get token from storage
    try {
      const authToken = await AsyncStorage.getItem('@Storage:authToken')
      if (authToken !== null) {
        this.props.setAuthToken(authToken)
      }
    } catch (error) {
      console.warn("error getting", error)
    }
  }

  async clearAuthToken() {
    // Remove token from storage
    try {
      const authToken = await AsyncStorage.removeItem('@Storage:authToken')
      this.props.setAuthToken(null)
    } catch (error) {
      console.warn("error clearing", error)
    }
  }



  /*============
    Rendering
  ===========*/

  showCurrentView() {
    const { authToken, currentView } = this.props
    switch (currentView) {
      case 'JobsIndex': return <JobsIndex/>
      case 'JobShow': return <JobShow/>
      case 'Profile': return <Profile/>
    }
  }

  render() {
    const { authToken, isLoading } = this.props
    const { setAuthToken, clearAuthToken, showCurrentView } = this

    return (
      <View style={styles.outerContainer}>
        <View style={styles.statusBarSpacer}/>

        { isLoading ?
          <isLoading/>
          :
          authToken ?
            <ScrollView style={styles.scrollView}>
              { showCurrentView() }
            </ScrollView>
            :
            <Login setAuthToken={setAuthToken}/>
        }

        { authToken &&
          <Footer
            clearAuthToken={clearAuthToken}
          />
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentView: state.currentView,
    authToken: state.authToken,
    isLoading: state.isLoading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthToken: (authToken) => {
      dispatch(action('SET_AUTH_TOKEN', { authToken }))
    },
    setIsLoading: (isLoading) => {
      dispatch(action('SET_IS_LOADING', { isLoading }))
    },
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)




/*=================================================
  Root component for wrapping App inside Provider
=================================================*/

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

export default Root



/*========
  Styles
========*/

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    height: '100%',
    width: '100%',
    marginBottom: 50,
  },
  statusBarSpacer: {
    // Make it the same height as the status bar
    height: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
    borderWidth: 0,
  }
});

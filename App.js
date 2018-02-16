import React from 'react'
import { AsyncStorage } from 'react-native'
import { Platform, StyleSheet, ScrollView, StatusBar, Text, View } from 'react-native'

import { Provider } from 'react-redux'
import store from './redux/store'
import { action } from './redux/action.js'
import { connect } from 'react-redux'

import moment from 'moment'

import Footer from './components/Footer.js'
import Login from './components/Login.js'
import JobsIndex from './components/JobsIndex/JobsIndex.js'
import JobShow from './components/JobShow/JobShow.js'
import Loading from './components/Loading.js'

import ActionCable from 'react-native-actioncable'
const cable = ActionCable.createConsumer('ws://192.168.1.69:3000/cable')

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

  componentDidMount() {
    const parent = this
    this.subscription = cable.subscriptions.create('EmployeesChannel', {
      received(data) {
        // If employee id of the job matches this current user's id
        if (parent.props.userData && Number(data.job.employee_id) === Number(parent.props.userData.id)) {
          const { job } = data

          parent.props.pushToJobsList(job)

          parent.playNotificationSound()

          Expo.Notifications.presentLocalNotificationAsync({
            title: "VanCleaning",
            body: `New Job: ${job.address} at ${moment(job.confirmed_time).format('MMMM Do YYYY, h:mm a')}`,
            ios: { sound: true },
          })
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    // Make isLoading false after loggin in
    if (!this.props.authToken && nextProps.authToken) this.props.setIsLoading(false)
  }

  async playNotificationSound() {
    const soundObject = new Expo.Audio.Sound();
    await soundObject.loadAsync(require('./notification.wav'), {}, true);
    await soundObject.playAsync()
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
      <View style={styles.container}>
        <View style={styles.statusBarSpacer}/>

        { isLoading &&
          <Loading/>
        }

        { authToken ?
          <ScrollView contentContainerStyle={styles.scrollView}>
            { showCurrentView() }
          </ScrollView>
          :
          <Login setAuthToken={setAuthToken}/>
        }

        { authToken && !isLoading &&
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
    userData: state.userData,
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
    pushToJobsList: (newJob) => {
      dispatch(action('PUSH_TO_JOBS_LIST', { newJob }))
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: 56,
    alignItems: 'center',
    minWidth: '100%',
  },
  statusBarSpacer: {
    // Make it the same height as the status bar
    height: (Platform.OS === 'ios') ? 20 : StatusBar.currentHeight,
    borderWidth: 0,
  }
});

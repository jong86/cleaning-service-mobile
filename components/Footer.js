import React from 'react'
import { TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { action } from '../redux/action.js'
import { connect } from 'react-redux'
import JobsIndex from './JobsIndex/JobsIndex.js';


class Footer extends React.Component {
  constructor() {
    super()

    this.logout = this.logout.bind(this)
    this.toIndexPage = this.toIndexPage.bind(this)
  }


  logout() {
    this.props.clearAuthToken()
  }

  toIndexPage() {
    this.props.setCurrentView('JobsIndex')
  }

  unfinishedJobsCount() {
    const { jobsList } = this.props
    let count = 0
    for (let i = 0; i < jobsList.length; i++) {
      if (!jobsList[i].time_work_completed) count++
    }
    return count
  }


  render() {
    const unfinishedJobsCount = this.unfinishedJobsCount()

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.toIndexPage}>
          <View style={styles.button}>
            <Ionicons name="ios-list-box-outline" size={32} color="white" />
            { unfinishedJobsCount > 0 &&
              <View style={styles.bubble}>
                <Text style={styles.bubbleText}>
                  { unfinishedJobsCount }
                </Text>
              </View>
            }
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.logout}>
          <View style={styles.button}>
            <Ionicons name="ios-log-out" size={32} color="white" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    currentView: state.currentView,
    jobsList: state.jobsList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentView: (currentView) => {
      dispatch(action('SET_CURRENT_VIEW', { currentView }))
    },
    setIsLoading: (isLoading) => {
      dispatch(action('SET_IS_LOADING', { isLoading }))
    },
  }
}

Footer = connect(mapStateToProps, mapDispatchToProps)(Footer)

export default Footer


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#212121'
  },
  button: {
    // backgroundColor: '#212121',
    height: '100%',
    padding: 8,
    width: 48,
    alignItems: 'center',
  },
  bubble: {
    position: 'absolute',
    left: 28,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 12,
    zIndex: 11,
    padding: 4,
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: {
    color: 'white',
  },
});

import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import Job from './Job'

import axios from 'axios'
import uuid from 'uuidv4'
import moment from 'moment'

import { action } from '../../redux/action.js'
import { connect } from 'react-redux'




class JobsIndex extends React.Component {
  constructor() {
    super()

    this.fetchJobsList = this.fetchJobsList.bind(this)
    this.renderJobsList = this.renderJobsList.bind(this)

    this.handlePressJob = this.handlePressJob.bind(this)
  }

  componentWillMount() {
    this.fetchJobsList()
  }

  async fetchJobsList() {
    const { authToken, setJobsList, setIsLoading } = this.props
    const { sortByStartDate } = this

    try {
      const config = { headers: { Authorization: authToken } }
      const request = axios.get('http://localhost:3000/employee/jobs', config)
      const response = await request

      setJobsList(response.data.jobs)

    } catch (error) {
      this.props.setIsLoading(false)
    }
  }


  handlePressJob(jobId) {
    const { setJobIdSelected, setCurrentView, setIsLoading } = this.props

    setIsLoading(true)

    // Set jobIdSelected to this one
    setJobIdSelected(jobId)

    // Set currentView to JobShow
    setCurrentView('JobShow')
  }


  renderJobsList() {
    const { jobsList } = this.props

    if (jobsList.length > 0) {
      return (
        <View style={styles.jobsList}>
          { jobsList.map(job => {
            return (
              <Job
                job={job}
                key={uuid()}
                handlePressJob={this.handlePressJob}
              />
            )
          })}
        </View>
      )
    } else {
      return (
        <View>
          <Text>
            You don't have any jobs
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Your scheduled jobs
        </Text>
        { this.renderJobsList() }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    jobIdSelected: state.jobIdSelected,
    jobsList: state.jobsList,
    authToken: state.authToken,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setJobIdSelected: (jobIdSelected) => {
      dispatch(action('SET_JOB_ID_SELECTED', { jobIdSelected }))
    },
    setCurrentView: (currentView) => {
      dispatch(action('SET_CURRENT_VIEW', { currentView }))
    },
    setJobsList: (incomingJobsList) => {
      dispatch(action('SET_JOBS_LIST', { incomingJobsList }))
    },
    setAuthToken: (authToken) => {
      dispatch(action('SET_AUTH_TOKEN', { authToken }))
    },
    setIsLoading: (isLoading) => {
      dispatch(action('SET_IS_LOADING', { isLoading }))
    },
  }
}

JobsIndex = connect(mapStateToProps, mapDispatchToProps)(JobsIndex)

export default JobsIndex



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heading: {
    fontWeight: 'bold',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 24,
    marginBottom: 24,
  },
  jobsList: {
    width: '100%',
  },
})

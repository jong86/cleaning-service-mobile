import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import axios from 'axios'
import uuid from 'uuidv4'
import moment from 'moment'

import action from '../redux/action.js'
import { connect } from 'react-redux'

import ReactNativeComponentTree from 'react-native/Libraries/Renderer/shims/ReactNativeComponentTree';


class JobsIndex extends React.Component {
  constructor() {
    super()
    this.state = {
      jobsList: [],
    }

    this.fetchJobsList = this.fetchJobsList.bind(this)
    this.renderJobsList = this.renderJobsList.bind(this)

    this.handlePressJob = this.handlePressJob.bind(this)
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


  handlePressJob(jobId) {
    console.log(jobId)
  }


  renderJobsList() {
    return (
      <View style={styles.jobsList}>
        { this.state.jobsList.map(job => {
          return (
            <TouchableWithoutFeedback
              key={uuid()}
              onPress={() => this.handlePressJob(job.id)}
            >
              <View style={styles.job}>
                <View style={styles.jobRow}>
                  <Text style={styles.label}>
                    ID
                  </Text>
                  <Text style={styles.content}>
                    { job.id }
                  </Text>
                </View>

                <View style={styles.jobRow}>
                  <Text style={styles.label}>
                    Time
                  </Text>
                  <Text style={styles.content}>
                    { moment(job.confirmed_time).format("MM-DD-YYYY") }
                  </Text>
                </View>

                <View style={styles.jobRow}>
                  <Text style={styles.label}>
                    Where
                  </Text>
                  <Text style={styles.content}>
                    { job.address }
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </View>
    )
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setJobIdSelected: (newJobIdSelected) => {
      dispatch(action('SET_JOB_ID_SELECTED', { newJobIdSelected }))
    },
    setCurrentView: (newView) => {
      dispatch(action('SET_CURRENT_VIEW', { newView }))
    }
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
    fontSize: 20,
    marginBottom: 20
  },
  jobsList: {
    width: '90%',
  },
  job: {
    borderWidth: 1,
    borderColor: 'silver',
    marginBottom: 20,
  },
  jobRow: {
    flexDirection: 'row',
    backgroundColor: 'gainsboro',
    padding: 4,
  },
  label: {
    fontWeight: 'bold',
    width: 48,
    textAlign: 'right',
  },
  content: {
    marginLeft: 8,
  }
});

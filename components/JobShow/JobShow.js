import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import JobInfoRow from './JobInfoRow'
import Button from './Button'

import axios from 'axios'

import moment from 'moment'

import { action } from '../../redux/action.js'
import { connect } from 'react-redux'


class JobShow extends React.Component {
  constructor() {
    super()

    this.onPressStartJob = this.onPressStartJob.bind(this)
    this.patchJob = this.patchJob.bind(this)
  }

  formatDate(date) {
    if (!date) return '-'
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
  }

  onPressStartJob() {
    const { jobIdSelected } = this.props
    const timeNow = new Date().toISOString()

    alert(`You are starting job #${jobIdSelected} at ${timeNow}`)
    this.patchJob('time_work_started', timeNow)
  }

  async patchJob(column, newValue) {
    const { jobIdSelected, authToken, updateJobState } = this.props
    try {
      const config = { headers: { Authorization: authToken } }
      const request = axios.patch(`http://192.168.1.69:3000/employee/jobs/${jobIdSelected}`, {
        [column]: newValue,
      }, config)

      const response = await request

      const newJobState = response.data.job

      console.log("newJobState", response.data.job)

      updateJobState(jobIdSelected, newJobState)

    } catch (error) {
      // console.warn(error)
    }
  }

  render() {
    const { jobIdSelected, jobsList } = this.props
    const { formatDate } = this

    const job = jobsList.find(job => job.id === jobIdSelected)

    return (
      <View style={styles.container}>
        <Text>
          This is job show for job { jobIdSelected }
        </Text>

        <View style={styles.jobInfo}>
          <JobInfoRow
            label='Address'
            content={job.address}
          />

          <JobInfoRow
            label='Description'
            content={job.description}
          />

          <JobInfoRow
            label='Customer phone number'
            content={job.phone}
          />

          <JobInfoRow
            label='Customer email'
            content={job.email}
          />

          <JobInfoRow
            label='Scheduled start time'
            content={formatDate(job.confirmed_time)}
          />

          <JobInfoRow
            label='Time you started work'
            content={formatDate(job.time_work_started)}
          />

          <JobInfoRow
            label='Time you completed work'
            content={formatDate(job.time_work_completed)}
          />

          <JobInfoRow
            label='Notes from office'
            content={job.admin_notes}
          />

          <JobInfoRow
            label='Your notes'
            content={job.employee_notes}
          />
        </View>

        <Button
          onPress={this.onPressStartJob}
          text="Start Job"
        />

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
    updateJobState: (jobId, jobState) => {
      dispatch(action('UPDATE_JOB_STATE', { jobId, jobState }))
    },
  }
}

JobShow = connect(mapStateToProps, mapDispatchToProps)(JobShow)

export default JobShow

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  jobInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

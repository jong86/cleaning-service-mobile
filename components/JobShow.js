import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import JobInfoRow from './JobInfoRow'

import axios from 'axios'

import moment from 'moment'

import { connect } from 'react-redux'


class JobShow extends React.Component {
  formatDate(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
  }


  render() {
    const { jobIdSelected, jobsList } = this.props
    const job = jobsList.find(job => job.id === jobIdSelected)

    const { formatDate } = this

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
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    jobIdSelected: state.jobIdSelected,
    jobsList: state.jobsList,
  }
}

JobShow = connect(mapStateToProps)(JobShow)

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

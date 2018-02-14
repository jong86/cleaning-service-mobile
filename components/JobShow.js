import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import JobInfoRow from './JobInfoRow'

import axios from 'axios'

import moment from 'moment'

import { connect } from 'react-redux'


class JobShow extends React.Component {
  render() {
    const { jobIdSelected, jobsList } = this.props
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
    backgroundColor: 'gainsboro',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

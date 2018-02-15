import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import moment from 'moment'

class Job extends React.Component {
  constructor() {
    super()

    this.jobStatus = this.jobStatus.bind(this)
  }


  jobStatus() {
    const {
      time_work_started: timeWorkStarted,
      time_work_completed: timeWorkCompleted,
    } = this.props.job

    if (!timeWorkStarted && !timeWorkCompleted) {
      return <Ionicons name="ios-alert" size={32} color="red" />
    } else if (timeWorkStarted && !timeWorkCompleted) {
      return <Ionicons name="ios-time" size={32} color="orange" />
    } else if (timeWorkStarted && timeWorkCompleted) {
      return <Ionicons name="ios-checkmark-circle" size={32} color="green" />
    } else {
      return 'No start time'
    }
  }


  render() {
    const { job, handlePressJob } = this.props

    return (
      <TouchableWithoutFeedback
        onPress={() => handlePressJob(job.id)}
      >
        <View style={styles.container}>
          <View style={styles.jobInfo}>
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
                { moment(job.confirmed_time).format('MMMM Do YYYY, h:mm:ss a') }
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

          <View style={styles.jobStatus}>
            <Text>
              { this.jobStatus() }
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Job


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'gainsboro',
    marginTop: 16,
    marginBottom: 16,
  },
  jobInfo: {
    marginBottom: 20,
    width: '80%',
    height: '100%',
    justifyContent: 'center',
  },
  jobRow: {
    flexDirection: 'row',
    padding: 4,
  },
  label: {
    fontWeight: 'bold',
    width: 48,
    textAlign: 'right',
  },
  content: {
    marginLeft: 8,
  },
  jobStatus: {
    width: '20%',
    justifyContent: 'center',
  },
});

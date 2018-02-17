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
      // return <Ionicons name="ios-alert-outline" size={32} color="red" />
      return <Text style={{color: '#03A9F4', fontWeight: 'bold'}}>NEW</Text>
    } else if (timeWorkStarted && !timeWorkCompleted) {
      return <Ionicons name="ios-time" size={32} color="#FFA726" />
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
            { this.jobStatus() }
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Job


const styles = StyleSheet.create({
  container: {
    width: '96%',
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'gainsboro',
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'silver',
  },
  jobInfo: {
    marginBottom: 24,
    width: '84%',
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
    width: '16%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'rgb(234, 234, 234)',
  },
});

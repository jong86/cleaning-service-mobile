import React from 'react'
import { TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { action } from '../redux/action.js'
import { connect } from 'react-redux'


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


  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.toIndexPage}>
          <View style={styles.button}>
            <Ionicons name="ios-list-box-outline" size={32} color="black" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.logout}>
          <View style={styles.button}>
            <Ionicons name="ios-log-out" size={32} color="black" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    currentView: state.currentView,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentView: (currentView) => {
      dispatch(action('SET_CURRENT_VIEW', { currentView }))
    }
  }
}

Footer = connect(mapStateToProps, mapDispatchToProps)(Footer)

export default Footer


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: 'gainsboro',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'steelblue',
    height: '100%',
    padding: 8,
    width: '25%',
    alignItems: 'center',
  }
});

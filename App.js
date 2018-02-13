import React from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import Footer from './components/Footer.js'
import Login from './components/Login.js'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
    }
  }

  render() {
    const { loggedIn } = this.state

    return (
      <View style={styles.container}>
        <Login/>
        { loggedIn && <Footer/> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

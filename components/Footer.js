import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';

export default class Footer extends React.Component {
  constructor() {
    super()

    this.logout = this.logout.bind(this)
  }


  logout() {
    this.props.clearAuthToken()
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.logout}>
          <View>
            <Text>
              Log out
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

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
    justifyContent: 'center',
  },
});

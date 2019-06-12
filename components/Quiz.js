import React from 'react'
import {Text} from 'react-native'


class Quiz extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.getParam('title')} Quiz`
  })

  render() {
    return (
      <Text>{this.props.navigation.getParam('numOfCards')}</Text>
    )
  }
}

export default Quiz
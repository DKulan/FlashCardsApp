import React from 'react'
import {Text} from 'react-native'


class DeckView extends React.Component {
  render() {
    return (
      <Text>{this.props.deckTitle}</Text>
    )
  }
}

export default DeckView
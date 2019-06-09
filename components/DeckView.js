import React from 'react'
import {Text, StyleSheet, View} from 'react-native'


class DeckView extends React.Component {
  render() {
    const {deckTitle, numOfQuestions} = this.props

    return (
      <View style={styles.deck}>
        <Text style={{fontSize: 30}}>{deckTitle}</Text>
        <Text style={{fontSize: 20, color: 'gray'}}>cards: {numOfQuestions}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomWidth: 2,
  }
})

export default DeckView
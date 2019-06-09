import React from 'react'
import {Text, TextInput, StyleSheet, KeyboardAvoidingView, AsyncStorage} from 'react-native'


class AddDeck extends React.Component {
  onSubmit = async () => {
    const deckTitleText = this.textInput._lastNativeText

    const value = await AsyncStorage.getItem(`${deckTitleText}`)

    if (!value) {
      this.props.navigation.navigate('DeckListView', {
        deckTitleText: deckTitleText
      })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.addDeck} behavior="padding" enabled>
        <Text style={{fontSize: 30}}>Create New Deck</Text>
        <TextInput
          style={{borderWidth: 1, paddingLeft: 30, paddingRight: 30, marginTop: 30}}
          placeholder='Type a new title for the deck'
          ref={input => this.textInput = input}
          onSubmitEditing={this.onSubmit}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  addDeck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AddDeck
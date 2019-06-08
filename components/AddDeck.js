import React from 'react'
import {Text, TextInput, StyleSheet, KeyboardAvoidingView, AsyncStorage} from 'react-native'


class AddDeck extends React.Component {
  state = {
    cardTitleText: ''
  }

  onSubmit = async () => {
    const {cardTitleText} = this.state

    const value = await AsyncStorage.getItem(`${cardTitleText}`)

    if (value === null) {
      this.props.navigation.navigate('DeckListView', {
        cardTitleText
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
          onChangeText={(text) => this.setState(() => ({cardTitleText: text}))}
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
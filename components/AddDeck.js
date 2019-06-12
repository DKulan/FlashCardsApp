import React from 'react'
import {Text, StyleSheet, KeyboardAvoidingView} from 'react-native'
import {Input} from 'react-native-elements'
import {connect} from 'react-redux'
import {addDeck} from '../actions'


class AddDeck extends React.Component {
  onSubmit = () => {
    const {dispatch, navigation} = this.props
    const title = this.textInput._lastNativeText

    if (title !== undefined && title.trim() !== '') {
      dispatch(addDeck({
        [title]: {
          title,
          questions: []
        }
      }))

      navigation.navigate('DeckList')
    } else {
      alert('Please enter a deck name')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.addDeck} behavior="padding" enabled>
        <Text style={{fontSize: 30, marginBottom: 75}}>Create New Deck</Text>
        <Input
          containerStyle={{width: 250}}
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
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default connect()(AddDeck)
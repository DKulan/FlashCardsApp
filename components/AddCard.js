import React from 'react'
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native'
import {Input} from 'react-native-elements'
import {addCard} from '../actions'
import {connect} from 'react-redux'


class AddCard extends React.Component {
  handleSubmit = () => {
    const {navigation, dispatch} = this.props
    const title = navigation.getParam('title')
    const question = this.questionInput.input._lastNativeText
    const answer = this.answerInput.input._lastNativeText

    if (question !== undefined && answer !== undefined && question.trim() !== '' && answer.trim() !== '') {
      dispatch(addCard(title, question, answer))

      this.props.navigation.navigate('DeckMenu')
    } else {
      alert('Question or answer cannot be empty!')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={{marginBottom: 50}}>
          <Input
            containerStyle={{marginBottom: 40}}
            placeholder='Enter the new question'
            ref={input => this.questionInput = input}
            onSubmitEditing={this.handleSubmit}
          />
          <Input
            placeholder='Enter the answer for the question'
            ref={input => this.answerInput = input}
            onSubmitEditing={this.handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default connect()(AddCard)
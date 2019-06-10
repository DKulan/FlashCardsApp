import React from 'react'
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native'
import {Button, Input} from 'react-native-elements'


class AddCard extends React.Component {
  handleSubmit = () => {
    const question = this.questionInput.input._lastNativeText
    const answer = this.answerInput.input._lastNativeText
    this.props.navigation.navigate('DeckQuizView', {
      question,
      answer
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={{marginBottom: 50}}>
          <Input
            placeholder='Question'
            ref={input => this.questionInput = input}
          />
          <Input
            placeholder='Answer'
            ref={input => this.answerInput = input}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Button title='Submit' onPress={this.handleSubmit}/>
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

export default AddCard
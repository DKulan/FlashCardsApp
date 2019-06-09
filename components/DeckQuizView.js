import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-elements'


class DeckQuizView extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: Object.keys(navigation.state.params.item)[0]
    }
  }

  render() {
    const {item} = this.props.navigation.state.params
    const deckTitle = Object.keys(item)[0]
    const numOfQuestions = Object.values(item)[0].questions.length

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.deckInfo}>
          <Text style={{fontSize: 30}}>{deckTitle}</Text>
          <Text style={{fontSize: 20, color: 'gray'}}>{numOfQuestions} cards</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Button title='Add Card' type='outline'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startBtn}>
          <Button title='Start Quiz'/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckInfo: {
    alignItems: 'center',
  },
  addBtn: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  startBtn: {
    alignItems: 'center'
  }
})

export default DeckQuizView
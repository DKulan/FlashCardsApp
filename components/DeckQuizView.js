import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native'
import {Button} from 'react-native-elements'


class DeckQuizView extends React.Component {
  state = {
    numOfCards: Object.values(this.props.navigation.state.params.item)[0].questions.length
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: Object.keys(navigation.state.params.item)[0]
    }
  }

  componentWillReceiveProps(nextProps) {
    const {question, answer} = nextProps.navigation.state.params
    const {item} = this.props.navigation.state.params
    const deckTitle = Object.keys(item)[0]

    if (question && answer) {
      AsyncStorage.getItem(`${deckTitle}`, (err, result) => {
        if (result !== null) {
          const parsedResult = JSON.parse(result)
          const newCardObj = parsedResult[deckTitle].questions.concat({
            question,
            answer
          })
          AsyncStorage.setItem(`${deckTitle}`, JSON.stringify({
            [deckTitle]: {
              questions: newCardObj
            }
          }))
          AsyncStorage.getItem(`${deckTitle}`, (err, result) => {
            const parsedResult = JSON.parse(result)

            this.setState(() => ({
              numOfCards: parsedResult[deckTitle].questions.length
            }))
          })
        }
      })
    }
  }

  handleAddCard = () => {
    this.props.navigation.navigate('AddCard', {
      items: this.props.navigation.state.params.item
    })
  }

  handleStart = () => {

  }

  render() {
    const {item} = this.props.navigation.state.params
    const deckTitle = Object.keys(item)[0]
    const {numOfCards} = this.state

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.deckInfo}>
          <Text style={{fontSize: 30}}>{deckTitle}</Text>
          <Text style={{fontSize: 20, color: 'gray'}}>{numOfCards} cards</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Button title='Add Card' type='outline' onPress={this.handleAddCard}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startBtn} onPress={this.handleStart}>
          <Button title='Start Quiz' disabled={numOfCards === 0 ? true : false}/>
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
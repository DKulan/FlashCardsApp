import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'


class DeckQuiz extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('title')
  })

  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.reload) {
      this.props.navigation.state.params.handleDeckLoad()
    }
  }

  handleAddCard = () => {
    this.props.navigation.navigate('AddCard', {
      title: this.props.navigation.getParam('title')
    })
  }

  handleStart = () => {

  }

  render() {
    const {navigation, numOfCards} = this.props
    const title = navigation.getParam('title')

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.deckInfo}>
          <Text style={{fontSize: 30}}>{title}</Text>
          <Text style={{fontSize: 20, color: 'gray'}}>{numOfCards} cards</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Button title='Add Card' type='outline' onPress={this.handleAddCard}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startBtn} onPress={this.handleStart}>
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

const mapStateToProps = (state, {navigation}) => ({
  numOfCards: state[navigation.getParam('title')].questions.length
})

export default connect(mapStateToProps)(DeckQuiz)
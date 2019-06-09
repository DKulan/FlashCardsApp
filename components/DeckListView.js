import React from 'react'
import {View, Text, StyleSheet, AsyncStorage, FlatList, TouchableOpacity} from 'react-native'
import DeckView from './DeckView'


class DeckListView extends React.Component {
  state = {
    decks: []
  }

  componentDidMount() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          this.setState((prevState) => ({
            decks: prevState.decks.concat(JSON.parse(store[i][1]))
          }))
        })
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    const {params} = nextProps.navigation.state

    if (params) {
      this.addNewCard(params.deckTitleText)
    }
  }

  addNewCard = (deckTitleText) => {
    const newDeckObj = {
      [deckTitleText]: {
        questions: []
      }
    }

    this.setState((prevState) => ({
      decks: prevState.decks.concat(newDeckObj)
    }))

    AsyncStorage.setItem(`${deckTitleText}`, JSON.stringify(newDeckObj))
  }

  handleDeckSelect = (item) => {
    this.props.navigation.navigate('DeckQuizView', {
      item
    })
  }

  render() {
    const {decks} = this.state

    if (decks.length === 0) {
      return (
        <View style={styles.notFound}>
          <Text style={{fontSize: 30}}>No decks found</Text>
        </View>
      )
    }

    return (
      <FlatList
        data={this.state.decks}
        keyExtractor={(item, index) => Object.keys(item)[0]}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => this.handleDeckSelect(item)}>
              <DeckView
                deckTitle={Object.keys(item)[0]}
                numOfQuestions={Object.values(item)[0].questions.length}
              />
            </TouchableOpacity>
          )
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default DeckListView
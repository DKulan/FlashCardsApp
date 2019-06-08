import React from 'react'
import {View, Text, StyleSheet, AsyncStorage, FlatList} from 'react-native'
import DeckView from './DeckView'


class DeckListView extends React.Component {
  state = {
    cards: null
  }

  componentDidMount = async () => {
    
  }


  renderItem = ({item}) => (
    <DeckView
      key={item.cardTitleText}
    />
  )

  render() {
    const {cards} = this.state

    if (!cards) {
      return (
        <View style={styles.notFound}>
          <Text style={{fontSize: 30}}>No decks found</Text>
        </View>
      )
    }

    return (
      <FlatList
        data={this.state.cards}
        renderItem={this.renderItem}
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
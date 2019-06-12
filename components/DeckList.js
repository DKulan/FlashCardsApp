import React from 'react'
import {FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {getDecks} from '../actions'
import Deck from './Deck'


class DeckList extends React.Component {
  componentDidMount() {
    this.handleDeckLoad()
  }

  handleDeckLoad = () => {
    this.props.dispatch(getDecks())
  }

  handleDeckSelect = (item) => {
    this.props.navigation.navigate('DeckMenu', {
      title: item[0],
      numOfCards: item[1].questions.length,
      handleDeckLoad: this.handleDeckLoad
    })
  }

  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.handleDeckSelect(item)}>
      <Deck
        title={item[0]}
        numOfCards={item[1].questions.length}
      />
    </TouchableOpacity>
  )

  render() {
    const {state} = this.props

    return Object.entries(state).length === 0
      ? null
      : (
        <FlatList
          keyExtractor={(item) => item[0]}
          data={Object.entries(state)}
          renderItem={this.renderItem}
        />
      )
  }
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default connect(mapStateToProps)(DeckList)
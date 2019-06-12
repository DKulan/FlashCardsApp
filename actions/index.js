export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
import {_getDecks} from '../utils/data'


const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks
})

const addDeck = (deck) => ({
  type: ADD_DECK,
  deck
})

const addCard = (title, question, answer) => ({
  type: ADD_CARD,
  title,
  question,
  answer
})

const getDecks = () => {
  return (dispatch) => {
    dispatch(receiveDecks(_getDecks()))
  }
}

export {receiveDecks, addDeck, addCard, getDecks}
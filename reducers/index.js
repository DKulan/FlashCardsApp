import {RECEIVE_DECKS, ADD_DECK, ADD_CARD} from '../actions'

const decks = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      }
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          questions: [
            ...state[action.title].questions.concat({
              question: action.question,
              answer: action.answer
            })
          ]
        }
      }
    default:
      return state
  }
}

export default decks
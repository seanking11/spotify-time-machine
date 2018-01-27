import { AUTHENTICATE_USER } from '../actions'

export default function (state = [], action) {
  console.log('Action Received:2 ', action)
  switch (action.type) {
    case AUTHENTICATE_USER:
      return [action.payload, ...state]
    default:
      return state
  }
}

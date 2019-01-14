import { AUTHENTICATE_USER } from '../actions'

export default function (state = [], action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return [action.payload, ...state]
    default:
      return state
  }
}

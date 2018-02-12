import { FETCH_HISTORY } from '../actions'

const initialState = {
  loading: true,
  data: {
    recenttracks: {
      track: []
    }
  }
}

export const ACTION_HANDLERS = {
  [FETCH_HISTORY]: (state, action) => ({
    ...state,
    loading: false,
    data: action.payload.data
  })
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

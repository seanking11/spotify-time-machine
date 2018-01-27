import { FETCH_HISTORY } from '../actions'

const initialState = {
  loading: true,
  data: {}
}

export const ACTION_HANDLERS = {
  [FETCH_HISTORY]: (state, action) => ({
    ...state,
    loading: false,
    data: action.request.data
  })
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  console.log('action is', action);

  return handler ? handler(state, action) : state
}

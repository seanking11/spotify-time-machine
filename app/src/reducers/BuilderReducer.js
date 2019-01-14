import { CHANGE_TABLE_PAGE, FETCH_HISTORY } from '../actions'
import constants from '../constants'

const initialState = {
  loading: true,
  data: {
    recenttracks: {
      track: []
    }
  },
  currentFetchedPage: 1,
  currentTablePage: 1
}

export const ACTION_HANDLERS = {
  [CHANGE_TABLE_PAGE]: (state, action) => ({
    ...state,
    currentTablePage: action.currentTablePage
  }),
  [FETCH_HISTORY]: (state, action) => ({
    ...state,
    loading: false,
    data: action.payload.data,
    totalTracks: parseInt(action.payload.data.recenttracks['@attr'].total),
    totalTablePages: Math.ceil(action.payload.data.recenttracks['@attr'].total / constants.tableRowDisplayCount),
    currentFetchedPage: action.payload.data.recenttracks['@attr'].page
  })
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

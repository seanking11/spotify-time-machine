import axios from 'axios'
import constants from '../constants'
import {
  CLIENT_ID,
  LASTFM_API_KEY
} from '../keys'

// eslint-disable-next-line max-len
const FULL_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=http:%2F%2Flocalhost:8080%2Fcallback&scope=user-top-read%20user-read-recently-played&show_dialog=true`

// eslint-disable-next-line max-len
const LASTFM_HISTORY_BASE_URL = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=200&api_key=${LASTFM_API_KEY}&format=json&user=`

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'

// TYPES

export const FETCH_HISTORY = 'fetch_history'
export const CHANGE_TABLE_PAGE = 'change_table_page'


// Not in use
export const authenticateUser = () => {
  window.location = FULL_URL

  return {
    type: AUTHENTICATE_USER
  }
}

// ACTION CREATORS

export const changeTablePage = currentTablePage => ({
  type: CHANGE_TABLE_PAGE,
  currentTablePage
})

export const fetchHistory = ({ user, page = 1 }, url) => {
  const requestUrl = url || `${LASTFM_HISTORY_BASE_URL}${user}&page=${page}`
  const request = axios.get(requestUrl)

  return {
    type: FETCH_HISTORY,
    payload: request
  }
}

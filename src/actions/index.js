import axios from 'axios'
import CLIENT_ID from '../clientId'

// eslint-disable-next-line max-len
const FULL_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=http:%2F%2Flocalhost:8080%2Fcallback&scope=user-top-read%20user-read-recently-played&show_dialog=true`
const HISTORY_URL = 'https://api.spotify.com/v1/me/player/recently-played'

// const params = {
//   response_type: 'token',
//   client_id: CLIENT_ID,
//   redirect_uri: 'http://localhost:8080/callback',
//   scope: 'user-top-read user-read-recently-played'
// }

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
export const FETCH_HISTORY = 'FETCH_HISTORY'

export const authenticateUser = () => {
  window.location = FULL_URL

  return {
    type: AUTHENTICATE_USER
  }
}

export const fetchHistory = token => {
  const request = axios.get(HISTORY_URL, { headers: { Authorization: `Bearer ${token}` } })

  return {
    type: FETCH_HISTORY,
    payload: request
  }
}

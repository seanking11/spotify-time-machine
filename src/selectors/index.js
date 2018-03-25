import { createSelector } from 'reselect'

const selectors = {}

selectors.builder = state => state.builder
selectors.data = state => state.builder.data

// Last FM
selectors.history = createSelector(
  selectors.builder,
  selectors.data,
  (builder, data) => data.recenttracks.track.map(item => {
    let date = 'Currently Playing'
    if (item.date) {
      date = item.date['#text']
    }

    return ({
      title: item.name,
      artist: item.artist['#text'],
      album: item.album['#text'],
      date
    })
  })
)

export default selectors

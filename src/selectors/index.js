import { createSelector } from 'reselect'

const selectors = {}

selectors.builder = state => state.builder
selectors.data = state => state.builder.data

selectors.history = createSelector(
  selectors.builder,
  selectors.data,
  (builder, data) => data.items.map(item => ({
    title: item.track.name,
    artist: item.track.artists[0].name,
    album: item.track.album.name,
    date: item.played_at
  }))
)

export default selectors

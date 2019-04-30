const axios = require('axios')

module.exports = songs => {
  const replaceSpaces = str => encodeURIComponent(str.trim())

  /*
   * Accepts an array of objects (songs) and looks up all the songs on spotify to find
   * their Spotify ID's used to add the songs to a playlist
   */
   console.log(typeof songs);
  const promises = songs.map(song => {
    const { artist, album, title } = song
    const query = `${replaceSpaces(title)}%20artist:${replaceSpaces(artist)}%20album:${replaceSpaces(album)}`
    const options = {
      params: {
        q: query,
        type: 'track'
      }
    }

    return axios.get('https://api.spotify.com/v1/search', options)
  })

  return Promise.all(promises)
  .then(results => {
    console.log(results)

    // const response = results.map(item => {
    //   console.log();
    // })
    return results
  })
}

// [{artist: 'lovelytheband', album: 'finding it hard to smile', title: 'make you feel pretty'}, {artist: 'Vhs Collection', album: 'So I Met Someone', title: 'So I Met Someone'}, {artist: 'The Dangerous Summer', album: 'Reach For The Sun', title: 'Where I Want To Be'}, {artist: 'Yellowcard', album: 'Lights and Sounds', title: 'Lights and Sounds'}, {artist: 'Bad Suns', album: 'Disappear Here', title: 'Off She Goes'}, {artist: 'Pierce The Veil', album: 'Misadventures', title: 'Circles'}, {artist: 'Children of Bodom', album: 'Are You Dead Yet?', title: 'Are You Dead Yet?'}, {artist: 'Forever the Sickest Kids', album: 'J.A.C.K.', title: 'Nikki'}, {artist: 'Bad Suns', album: 'Language & Perspective', title: 'Pretend'}]
//
// [{"artist": "lovelytheband", "album": "finding it hard to smile", "title": "make you feel pretty"}, {"artist": "Vhs Collection", "album": "So I Met Someone", "title": "So I Met Someone"}, {"artist": "The Dangerous Summer", "album": "Reach For The Sun", "title": "Where I Want To Be"}, {"artist": "Yellowcard", "album": "Lights and Sounds", "title": "Lights and Sounds"}, {"artist": "Bad Suns", "album": "Disappear Here", "title": "Off She Goes"}, {"artist": "Pierce The Veil", "album": "Misadventures", "title": "Circles"}, {"artist": "Children of Bodom", "album": "Are You Dead Yet?", "title": "Are You Dead Yet?"}, {"artist": "Forever the Sickest Kids", "album": "J.A.C.K.", "title": "Nikki"}, {"artist": "Bad Suns", "album": "Language & Perspective", "title": "Pretend"}]

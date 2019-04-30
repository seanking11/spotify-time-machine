const getSpotifyIdsFromSongs = require('./getSpotifyIdsFromSongs')

module.exports = function(req, res) {
  if (!req.body.songs) {
    return res.status(400).send({ error: 'Must include an array of song objects' });
  }

  const { songs } = req.body
  console.log(songs);

  return getSpotifyIdsFromSongs(songs)
  .then(spotifyIds => res.status(201).send(spotifyIds))
  .catch(error => {
    console.log('Error trying to look up songs', error);
    return res.status(400).send(error)
  })
}

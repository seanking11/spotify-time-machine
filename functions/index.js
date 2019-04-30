const functions = require('firebase-functions');
const getSpotifyIdsFromSongsHandler = require('./getSpotifyIdsFromSongsHandler')

exports.getSpotifyIdsFromSongsHandler = functions.https.onRequest(getSpotifyIdsFromSongsHandler);

var RiotLolAPI = require('riot-lol-api');
var async = require('async');

var RIOT_API = process.env.RIOT_API || ''
var rateLimits = null;
var lol = new RiotLolAPI(RIOT_API, rateLimits);

/* === */
function getSummonerId(summonerName, callback) {
  lol.request('euw', `/api/lol/euw/v1.4/summoner/by-name/${summonerName}`, (err, data) => {
    if (err) callback(err)
    callback(null, data[Object.keys(data)[0]].id);
  })
}

function getGames(summonerId, callback) {

}
/* === */

/**
 * This should be an object
 * players = {
 *   summonerId: lastGameId,
 *   ...
 * }
 */
var players = {}

/* === */

lol.request('euw', '/observer-mode/rest/featured', (err, data) => {

  data.gameList.forEach(game => {
    game.participants.forEach(player => {
      getSummonerId(player.summonerName, (err, name) => {
        players[name] = null;
      })
    })
  })

  setTimeout(() => {
    console.log(players)
  }, 1000)
});

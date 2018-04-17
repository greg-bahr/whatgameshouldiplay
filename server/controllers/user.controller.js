const axios = require('axios');
const config = require('../config/api.config');

exports.findGamesBySteamID = async (req, res) => {
  try {
    res.send(await findBySteamID(req.params.id));
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
}

exports.findGamesByVanityURL = async (req, res) => {
  const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.key}&vanityurl=${req.params.id}`;

  try { 
    const id = await axios(url);
    console.log(id.data);
    if (id.data.response.steamid) {
      res.send(await findBySteamID(id.data.response.steamid));
    } else {
      res.status(404).send("Failed to find account.");
    }
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function findBySteamID(id) {
  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${config.key}&steamid=${id}&format=json`;

  return (await axios(url)).data;
}

const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  let map = args[0];

  if (!map) {
    return errors.noTakovMap(message);
  }

  switch (map.toLowerCase()) {
    case 'custom':
    case 'customs':
      return message.channel.send(
        'https://www.gamemaps.co.uk/game/tarkov/maps/customs_3d_maksen_marvelin_2019'
      );
    case 'shoreline':
      return message.channel.send(
        'https://www.gamemaps.co.uk/game/tarkov/maps/shoreline_3d_maksen'
      );
    case 'wood':
    case 'woods':
      return message.channel.send(
        'https://www.gamemaps.co.uk/game/tarkov/maps/woods_stash_location_marvelin'
      );
    case 'reserve':
    case 'reserves':
      return message.channel.send(
        'https://www.gamemaps.co.uk/game/tarkov/maps/reserve_3d_photonready'
      );
    case 'interchange':
      return message.channel.send(
        'https://www.gamemaps.co.uk/game/tarkov/maps/interchange_full_loot_lorathor_v2'
      );
    case 'factory':
      return message.channel.send(
        'https://www.gamemaps.co.uk/game/tarkov/maps/factory_callouts'
      );
    case 'lab':
    case 'thelab':
      return message.channel.send(
        'https://www.gamemaps.co.uk/game/tarkov/maps/lab_explained_en'
      );
    default:
      return errors.noTarkovMap(message);
  }

  return;
};

module.exports.help = {
  name: 'tarkov',
  description: 'Get the Tarkov map',
  usage: 'tarkov [map]'
};

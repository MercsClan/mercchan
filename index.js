const { CommandoClient } = require('discord.js-commando');
const { MessageEmbed, Structures } = require('discord.js');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const botToken = process.env.DISCORDTOKEN;
const owner = process.env.OWNER;

Structures.extend('Guild', function (Guild) {
  class MercsGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1,
      };
    }
  }
  return MercsGuild;
});

const mercchan = new CommandoClient({
  commandPrefix: '!',
  owner: owner,
});

mercchan.registry
  .registerDefaultTypes()
  .registerGroups([
    ['other', 'Helpful Commands'],
    ['games', 'Games'],
    ['rpg', 'Role Playing'],
    ['admin', 'Admin Commands'],
    ['events', 'Server Events'],
    ['music', 'Music Commands'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false,
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

const eventFiles = fs
  .readdirSync('./events')
  .filter((files) => files.endsWith('.js'));

for (const event of eventFiles) {
  const events = require(`./events/${event}`);
  const eventsName = event.split('.')[0];
  if (eventsName === 'ready') {
    mercchan.once(eventsName, events.bind(null, mercchan));
  } else {
    mercchan.on(eventsName, events.bind(null, mercchan));
    console.log(`Loaded Event: ${eventsName}`);
  }
}

mercchan.login(botToken);

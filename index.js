const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
require('dotenv').config();
const path = require('path');
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
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
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

const events = {
  ready: require('./events/ready.js'),
  guildMemberAdd: require('./events/guildMemberAdd.js'),
  guildCreate: require('./events/guildCreate.js'),
  voiceStateUpdate: require('./events/voiceStateUpdate.js'),
  messageReactionAdd: require('./events/messageReactionAdd.js'),
  messageReactionRemove: require('./events/messageReactionRemove.js'),
};

mercchan
  .on('ready', () => events.ready(mercchan))
  .on('guildMemberAdd', (member) => events.guildMemberAdd(member))
  .on('guildCreate', (guild) => events.guildCreate(guild))
  .on('voiceStateUpdate', (oldState, newState) =>
    events.voiceStateUpdate(oldState, newState, mercchan)
  )
  .on('messageReactionAdd', (reaction, user) =>
    events.messageReactionAdd(reaction, user, mercchan)
  )
  .on('messageReactionRemove', (reaction, user) =>
    events.messageReactionRemove(reaction, user, mercchan)
  );
mercchan.login(botToken);

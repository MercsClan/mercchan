const { CommandoClient } = require('discord.js-commando');
const { MessageEmbed, Structures } = require('discord.js');
require('dotenv').config();
const path = require('path');
const botToken = process.env.DISCORDTOKEN;

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
  owner: '156444313058803712',
});

mercchan.registry
  .registerDefaultTypes()
  .registerGroups([
    ['admin', 'Admin Commands'],
    ['music', 'Music Commands'],
    ['games', 'Games'],
    ['other', 'Other Commands'],
    ['utilities', 'Utilities'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false,
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

mercchan.once('ready', () => {
  console.log(`Logged in as ${mercchan.user.tag}, ${mercchan.user.id}`);
  mercchan.user.setActivity('MercChan V2 Test');
});

//Voice Channel State Change
//WHEN JOIN 'WANTING TO PLAY' - EMBED MESSAGE IN CHANNEL
mercchan.on('voiceStateUpdate', async (oldState, newState) => {
  try {
    if (
      newState.channelID === '342428152645287947' &&
      oldState.channelID !== '342428152645287947'
    ) {
      const user = newState.member.user;
      const title = newState.member.roles.highest.name;
      const channel = await mercchan.channels.fetch('731692862323818538');

      let embed = new MessageEmbed();
      if (title === '@everyone') {
        embed.setTitle(`${user.username} Joined Wanting To Play`);
      } else {
        embed.setTitle(`${title} ${user.username} Joined Wanting To Play`);
      }
      embed.setColor(newState.member.roles.highest.hexColor);
      embed.setThumbnail(await user.avatarURL());
      await channel.send(embed);
    }
    if (
      newState.member.user.bot &&
      !newState.channelID &&
      newState.guild.musicData.songDispatcher &&
      newState.member.user.id == mercchan.user.id
    ) {
      newState.guild.musicData.queue.length = 0;
      newState.guild.musicData.songDispatcher.end();
      return;
    }
    if (
      newState.member.user.bot &&
      newState.channelID &&
      newState.member.user.id == mercchan.user.id &&
      !newState.selfDeaf
    ) {
      newState.setSelfDeaf(true);
    }
  } catch (err) {
    console.log(err);
  }
});

mercchan.login(botToken);

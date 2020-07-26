const { CommandoClient } = require('discord.js-commando');
const Discord = require('discord.js');
require('dotenv').config();
const path = require('path');
const botToken = process.env.DISCORDTOKEN;

const mercchan = new CommandoClient({
  commandPrefix: '!',
  owner: '156444313058803712',
});

mercchan.registry
  .registerDefaultTypes()
  .registerGroups([
    ['admin', 'Admin Commands'],
    ['music', 'Music Commands'],
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
    const user = newState.member.user;
    const title = newState.member.roles.highest.name;
    const channel = await mercchan.channels.fetch('731692862323818538');
    if (
      newState.channelID === '342428152645287947' &&
      oldState.channelID !== '342428152645287947'
    ) {
      let embed = new Discord.MessageEmbed()
        .setTitle(`${title} ${user.username} Joined Wanting To Play`)
        .setColor(newState.member.roles.highest.hexColor)
        .setThumbnail(await user.avatarURL());
      await channel.send(embed);
    }
  } catch (err) {
    console.log(err);
  }
});

mercchan.login(botToken);

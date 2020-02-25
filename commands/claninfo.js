const Discord = require('discord.js'); // this links to the official Discord npm package
const config = require('../config.json'); // this links to the config.json file

module.exports.run = async (client, message, args) => {
  let guild = message.guild;
  let icon = message.guild.iconURL;
  let textChannels = 0;
  let voiceChannels = 0;
  guild.channels.forEach(channel => {
    channel.type === 'text' ? textChannels++ : voiceChannels++;
  });

  const emojis = message.guild.emojis.map(e => e.toString()).join(' ');
  const roles = message.guild.roles.map(e => e.toString()).join(' ');

  let embed = new Discord.RichEmbed()
    .setTitle(`Information about ${message.guild.name}`)
    .setColor(config.white)
    .setThumbnail(icon)
    .addField('Clan Name', guild.name, true)
    .addField('Clan ID', guild.id, true)
    .addField('Clan Commander', guild.owner, true)
    .addField('Discord Server Region', guild.region.toUpperCase(), true)
    .addField('Member Count', guild.memberCount)
    .addField('Website', 'https://MercsClan.com');

  return message.channel.send(embed);
};

module.exports.help = {
  name: 'claninfo',
  description: 'Displays information about the clan.',
  usage: 'claninfo'
};

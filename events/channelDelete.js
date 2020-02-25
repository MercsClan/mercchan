const Discord = require('discord.js');
const config = require('../config.json');

module.exports = (channel, message) => {
  let auditlogchannel = message.guild.channels.find(
    channel => channel.name === 'audit-log'
  );
  if (!auditlogchannel) return;

  try {
    let createdAtRaw = channel.createdAt.toDateString();
    let createdAt = createdAtRaw.split(' ');

    let embed = new Discord.RichEmbed()
      .setTitle('Channel has been deleted!')
      .setColor(config.red)
      .addField('Channel Name', `${channel.name}`, true)
      .addField('Channel Type', `${channel.type}`, true)
      .addField(
        'Deleted At',
        `${createdAt[0]} ${createdAt[2]} ${createdAt[1]}`
      );
    auditlogchannel.send(embed);

    console.log(
      `[${channel.guild}] The channel ${channel.name} has been deleted.`
    );
  } catch (error) {
    console.log(error);
  }
  return;
};

const Discord = require('discord.js');
const config = require('../config.json');

module.exports = member => {
  let auditlogchannel = message.guild.channels.find(
    channel => channel.name === 'audit-log'
  );
  if (!auditlogchannel) return;
  try {
    let embed = new Discord.RichEmbed()
      .setTitle('User has joined the server!')
      .setColor(config.green)
      .addField('Username', member.user.username, true)
      .addField('Tag', member, true);
    auditlogchannel.send(embed);

    console.log(
      `[${member.guild}] ${member.user.username} has joined the ${member.guild} Discord.`
    );
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};

const Discord = require('discord.js');
const config = require('../config.json');

module.exports = member => {
  let auditlogchannel = message.guild.channels.find(
    channel => channel.name === 'audit-log'
  );
  if (!auditlogchannel) return;

  let embed = new Discord.RichEmbed()
    .setTitle('User has left the server!')
    .setColor(config.red)
    .addField('Username', member.user.username, true)
    .addField('Tag', member, true);

  try {
    auditlogchannel.send(embed);
  } catch (error) {
    console.log(error);
  }

  console.log(
    `[${member.guild}] ${member.user.username} has left the ${member.guild} Discord.`
  );
};

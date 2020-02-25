const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.members.first());
  if (!user) {
    return errors.invalidUser(message);
  } else {
    let embed = new Discord.RichEmbed()
      .setTitle(`Here is ${user.displayName}s avatar.`)
      .setColor(config.white)
      .setImage(user.user.displayAvatarURL);
    message.channel.send(embed).catch(err => console.log(err));
    return;
  }
};

module.exports.help = {
  name: 'avatar',
  description: 'This will display your avatar.',
  usage: 'avatar [@user]'
};

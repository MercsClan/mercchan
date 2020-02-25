const Discord = require('discord.js');
const config = require('../config.json');
require('dotenv').config();
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (message.author.id !== `${config.ownerid}`)
    return errors.ownersOnly(message);

  if (message.author.id == `${config.ownerid}`) {
    let embed = new Discord.RichEmbed()
      .setTitle('Rebooting...')
      .setColor(config.red);
    message.channel
      .send(embed)

      .then(message => client.destroy())
      .then(() => client.login(process.env.DISCORDTOKEN))
      .catch(err => console.log(err));
  }
};

module.exports.help = {
  name: 'reboot',
  description: 'This will reboot the bot instance.',
  usage: 'reboot'
};

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class roll extends Command {
  constructor(client) {
    super(client, {
      name: 'coinflip',
      aliases: ['cf'],
      memberName: 'coinflip',
      group: 'rpg',
      description: 'Flips a coin',
      throttling: {
        usages: 1,
        duration: 5,
      },
      guildOnly: true,
      clientPermissions: ['SEND_MESSAGES'],
    });
  }

  run(message) {
    const roll = Math.round(Math.random() * 1);

    const embed = new MessageEmbed()
      .setTitle('Flipping a coin')
      .setColor('#ff0000');
    if (roll) {
      embed.setImage('https://i.imgur.com/A3bez4Y.jpg');
    } else {
      embed.setImage('https://i.imgur.com/QG66xxA.jpg');
    }

    message.embed(embed);
  }
};

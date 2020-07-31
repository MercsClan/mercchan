const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class reboot extends Command {
  constructor(client) {
    super(client, {
      name: 'reboot',
      aliases: ['restart'],
      memberName: 'reboot',
      group: 'utilities',
      description: 'Reboot MercChan',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
    });
  }

  run(message) {
    process.exit(0);
  }
};

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
  hasPermission(message) {
    if (message.member.roles.highest.name.includes('⚔️ Commander')) return true;
    return 'Command for Premium Members Only';
  }

  run(message) {
    process.exit(0);
  }
};

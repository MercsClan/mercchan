const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class kill extends Command {
  constructor(client) {
    super(client, {
      name: 'kill',
      aliases: ['stop-bot'],
      memberName: 'kill',
      group: 'utilities',
      description: 'Stops MercChan',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      hidden: true,
    });
  }
  hasPermission(message) {
    if (message.member.roles.highest.name.includes('⚔️ Commander')) return true;
    return 'Commanders Only';
  }

  run(message) {
    process.exit(0);
  }
};

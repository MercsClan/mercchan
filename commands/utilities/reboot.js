const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
require('dotenv').config();
const postSite = process.env.postSite;

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
      hidden: true,
    });
  }
  hasPermission(message) {
    if (message.member.roles.highest.name.includes('⚔️ Commander')) return true;
    return 'Command for Premium Members Only';
  }

  async run(message) {
    //process.exit(0);
    axios({
      method: 'post',
      url: `${postSite}/command`,
      headers: { 'contenct-type': 'application/x-www-form-urlencoded' },
      data: {
        cli: 'pm2',
        action: 'restart',
        processName: 'mercchan --watch',
      },
    });
  }
};

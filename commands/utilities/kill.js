const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const os = require('os');
const axios = require('axios');
require('dotenv').config();
const postSite = process.env.postSite;

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
    if (os.arch === 'arm') {
      axios({
        method: 'post',
        url: `${postSite}/command`,
        headers: { 'content-type': 'application/json' },
        data: {
          cli: 'pm2',
          action: 'stop',
          processName: 'mercchan',
        },
      });
    } else {
      process.exit(0);
    }
  }
};

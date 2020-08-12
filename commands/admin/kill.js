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
      group: 'admin',
      description: 'Stops MercChan',
      guildOnly: true,
      clientPermissions: ['SEND_MESSAGES'],
      hidden: true,
    });
  }

  run(message) {
    if (os.arch() === 'arm') {
      message.say('Sending webhook to stop PM2');
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
      message.say('Stopping Mercchan');
      process.exit(0);
    }
  }
};

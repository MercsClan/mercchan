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
      group: 'admin',
      description: 'Reboot MercChan',
      guildOnly: true,
      clientPermissions: ['SEND_MESSAGES'],
      hidden: true,
    });
  }
  hasPermission(message) {
    const approvedRoles = ['⚔️ Commander'];
    const title = message.member.roles.highest.name;
    return approvedRoles.includes(title) ? true : 'Only Commanders may reboot.';
  }

  async run(message) {
    message.say('Sending reboot webhook');
    axios({
      method: 'post',
      url: `${postSite}/command`,
      headers: { 'content-type': 'application/json' },
      data: {
        cli: 'pm2',
        action: 'restart',
        processName: 'mercchan --watch',
      },
    });
  }
};

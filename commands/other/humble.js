const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = class HumbleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'humble',
      aliases: ['humble-bundle', 'hb'],
      group: 'other',
      memberName: 'humble',
      description: 'Fetches current game Humble Bundles',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 10,
      },
      clientPermissions: ['SEND_MESSAGES'],
    });
  }

  async run(msg, { count }) {
    try {
      const res = await axios.get(
        'https://www.humblebundle.com/androidapp/v2/service_check'
      );
      const body = res.data;
      if (!body.length) return msg.say('No game bundles right now');
      else {
        const embed = new MessageEmbed();
        embed.setTitle('Current Humble-Bundles');
        embed.setThumbnail('https://i.imgur.com/EvX89dK.png');
        body.forEach((bundle) => {
          embed.addField(bundle.bundle_name, bundle.url);
        });
        embed.setColor('#B42B32');
        return msg.embed(embed);
      }
    } catch (err) {
      return msg.reply(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  }
};

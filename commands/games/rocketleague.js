const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fetchStats = require('../../utils/RocketLeague');
const axios = require('axios');
require('dotenv').config();

module.exports = class ITADCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'rocketleague',
      aliases: ['rl', 'rlstats'],
      memberName: 'rocket',
      group: 'games',
      description: 'Check Rocket League stats for a Steam name',
      //   throttling: {
      //     usages: 1,
      //     duration: 15,
      //   },
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      args: [
        {
          key: 'query',
          prompt: 'Steam name to fetch? steamcommunity/id/USETHIS ',
          type: 'string',
          validate: function (query) {
            return query.length > 0 && query.length < 200;
          },
        },
      ],
    });
  }

  async run(message, { query }) {
    let embed = new MessageEmbed();
    embed.setTitle(`Rocket League Stats for ${query}`);
    embed.setThumbnail(
      'https://rocketleague.media.zestyio.com/Rocket-League-Logo-Full_On-Dark-Horizontal.f1cb27a519bdb5b6ed34049a5b86e317.png'
    );
    let stats = await fetchStats(query);
    if (stats !== null) {
      embed.addField('Wins', stats.stats.wins, true);
      embed.addField('MVPs', stats.stats.mvps, true);
      embed.addField('Goals', stats.stats.goals, true);
      embed.addField('Saves', stats.stats.saves, true);
      embed.addField('Shots', stats.stats.shots, true);
      embed.addField('Assists', stats.stats.assists, true);
    } else {
      embed.setTitle('Something went wrong, check your SteamID');
    }
    message.embed(embed);
  }
};

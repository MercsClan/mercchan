const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { default: Axios } = require('axios');
require('dotenv').config();
const APIKey = process.env.IGDB_API_KEY;
const axios = require('axios');

module.exports = class eventCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'event',
      aliases: ['trourney', 'party'],
      group: 'other',
      memberName: 'event',
      description: 'Announces a server event',
      examples: ['!event "game" "number of players" "day" "time"'],
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      args: [
        {
          key: 'queryGame',
          prompt: 'What game would you like to play?',
          type: 'string',
        },
        {
          key: 'queryPlayerNum',
          prompt: 'How many players?',
          type: 'integer',
        },
        {
          key: 'queryEventDay',
          prompt: 'What Day?',
          type: 'string',
        },
        {
          key: 'queryEventTime',
          prompt: 'What Time?',
          type: 'string',
        },
      ],
    });
  }
  async run(
    message,
    { queryGame, queryPlayerNum, queryEventDay, queryEventTime }
  ) {
    const embed = new MessageEmbed();
    const eventTime = queryEventTime;
    const eventDay = queryEventDay;
    const eventGame = queryGame;
    const eventPlayers = queryPlayerNum;

    const baseURL = 'https://api-v3.igdb.com';

    await axios
      .get(`${baseURL}/games`, {
        headers: {
          'user-key': APIKey,
          'contenct-type': 'application/json',
        },
        params: {
          fields: 'name, cover.url',
          search: eventGame,
        },
      })
      .then((response) => {
        embed.setTitle(`${eventGame} Event`);
        if (response.data.length > 0) {
          const coverart = `https:${response.data[0].cover.url}`;
          embed.setThumbnail(coverart);
        }
        embed.setColor('#bb070e');
        embed.addFields(
          { name: 'When:', value: `${eventDay} at ${eventTime}` },
          { name: 'Number of Players:', value: eventPlayers }
        );
        embed.addField('\u200b', 'Drop us an emoji if you can make it');
        embed.setFooter(`Event created by: ${message.author.username}`);
      })
      .catch((error) => {
        console.log('Something went wrong');
      });
    message.embed(embed);
  }
};

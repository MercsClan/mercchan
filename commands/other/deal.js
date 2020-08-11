const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
require('dotenv').config();
const APIKey = process.env.ITAD_API_KEY;

module.exports = class ITADCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'deal',
      aliases: ['game-deal', 'deals'],
      memberName: 'deal',
      group: 'other',
      description: 'Games Deals from IsThereAnyDeals.com',
      throttling: {
        usages: 1,
        duration: 15,
      },
      guildOnly: true,
      clientPermissions: ['SEND_MESSAGES'],
      args: [
        {
          key: 'query',
          prompt: 'What game would you like to look up?',
          type: 'string',
          validate: function (query) {
            return query.length > 0 && query.length < 200;
          },
        },
      ],
    });
  }

  async run(message, { query }) {
    let codedGame = '';
    let active = false;
    const embed = new MessageEmbed();
    embed.setTitle(`${query} Deals`);
    await getPlain(query)
      .then((res) => {
        codedGame = res.data.data.plain;
        active = res.data['.meta'].active;
      })
      .then()
      .catch((error) => {
        embed.setDescription('Something went wrong');
      });
    if (active && codedGame !== '') {
      await axios
        .get('https://api.isthereanydeal.com/v01/game/prices/', {
          params: {
            key: APIKey,
            plains: codedGame,
            region: 'us',
            country: 'US',
            shops:
              'amazonus,battlenet,epic,gog,greenmangaming,humblestore,itchio,microsoft,origin,steam,uplay,wingamestore',
          },
        })
        .then((response) => {
          if (response.data.data[codedGame].list.length > 0) {
            const data = response.data.data[codedGame];
            embed.setURL(data.urls.game);
            data.list.forEach((price) => {
              const priceString = `Original Price: $${price.price_old.toFixed(
                2
              )} | Sale Price: $${price.price_new.toFixed(2)}`;
              embed.addField(price.shop.name, priceString, true);
            });
          } else {
            embed.setDescription('Game has no Sales');
          }
        })
        .catch((error) => {
          embed.setDescription('Something went wrong');
        });
    } else {
      embed.setDescription('Game not found in Deals');
    }
    message.embed(embed);
  }
};

const getPlain = (plain) => {
  return axios.get('https://api.isthereanydeal.com/v02/game/plain/?', {
    params: {
      key: APIKey,
      title: plain,
    },
  });
};

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
require('dotenv').config();
const APIKey = process.env.OWM_API_KEY;

module.exports = class weatherCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'weather',
      aliases: ['forecast'],
      memberName: 'weather',
      group: 'other',
      description: 'Weather forecast from Dark Sky',
      throttling: {
        usages: 1,
        duration: 6,
      },
      guildOnly: true,
      clientPermissions: ['SEND_MESSAGES'],
      args: [
        {
          key: 'query',
          prompt: 'Where would you like to check the weather?',
          type: 'string',
          validate: function (query) {
            return query.length > 0 && query.length < 200;
          },
        },
      ],
    });
  }

  async run(message, { query }) {
    const embed = new MessageEmbed();
    await axios
      .get('https://api.openweathermap.org/data/2.5/weather?', {
        params: {
          zip: query,
          appid: APIKey,
          units: 'imperial',
        },
      })
      .then((response) => {
        const city = response.data.name;
        const rawTemp = response.data.main.temp;
        const condition = response.data.weather[0].icon;
        let color = '';
        if (rawTemp < 40) {
          color = '#037bfc';
        } else if (rawTemp < 50) {
          color = '#03fcfc';
        } else if (rawTemp < 60) {
          color = '#03fc5e';
        } else if (rawTemp < 70) {
          color = '#b5fc03';
        } else if (rawTemp < 80) {
          color = '#fce303';
        } else if (rawTemp < 90) {
          color = '#fc8c03';
        } else {
          color = '#fc2403';
        }
        let conditionURL = `http://openweathermap.org/img/wn/${condition}@2x.png`;
        embed.setColor(color);
        const temp = `Actual: ${rawTemp}°F`;
        const feels = ` Feels Like: ${response.data.main.feels_like}°F`;
        const humidity = `${response.data.main.humidity}%`;
        embed.setTitle(`Weather for ${city}`);
        embed.addFields(
          { name: 'Temp', value: `${temp}  |  ${feels}` },
          { name: 'Humidity', value: humidity },
          {
            name: 'Description',
            value: `${response.data.weather[0].description}`,
          },
          {
            name: 'Sunrise',
            value: `${new Date(
              response.data.sys.sunrise * 1000
            ).toLocaleTimeString()} CST`,
            inline: true,
          },
          {
            name: 'Sunset',
            value: `${new Date(
              response.data.sys.sunset * 1000
            ).toLocaleTimeString()} CST`,
            inline: true,
          }
        );
        embed.setThumbnail(conditionURL);
      })
      .catch((error) => {
        console.log(error);
      });
    message.embed(embed);
  }
};

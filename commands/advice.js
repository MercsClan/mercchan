const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  const adviceArray = [''];
  const advice = adviceArray[Math.floor(Math.random() * adviceArray.length)];
  return message.channel.send(advice);
};

module.exports.help = {
  name: 'advice',
  description: 'Get some advice from Merc-Chan',
  usage: 'advice'
};

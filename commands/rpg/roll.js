const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class roll extends Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      aliases: ['r'],
      memberName: 'roll',
      group: 'rpg',
      description: 'Roll Some Dice',
      throttling: {
        usages: 1,
        duration: 5,
      },
      guildOnly: true,
      clientPermissions: ['SEND_MESSAGES'],
      args: [
        {
          key: 'dice',
          prompt: 'What dice would you like to roll?',
          type: 'string',
          validate: function (dice) {
            return dice.length > 0 && dice.length < 200;
          },
        },
      ],
    });
  }

  run(message, { dice }) {
    const delim = dice.split('');
    const die = dice.split('d');
    const numOfDie = Number(die[0]);
    const sizeOfDie = Number(die[1]);
    let validation = true;

    if (Number.isNaN(numOfDie)) {
      return message.channel.send('Number of dice entered is not a number');
    }
    if (!(numOfDie < 10)) {
      console.log(numOfDie);
      return message.channel.send('Cannot role more than 9 die at a time');
    }

    if (delim[1].toUpperCase() != 'D') {
      return message.channel.send(
        'Invalid Format. Rolls must be entered (# of dice)d(size of dice). ie 3d10'
      );
    }

    const embed = new MessageEmbed()
      .setTitle(`Rolling ${numOfDie} d ${sizeOfDie}`)
      .setColor('#0099ff');

    const d20emoji = message.guild.emojis.cache.get('742831375631122553');
    let roll;
    let rollTotal = 0;
    for (let diceRoll = 0; diceRoll < numOfDie; diceRoll++) {
      roll = Math.floor(Math.random() * sizeOfDie) + 1;
      embed.addField(`Roll ${diceRoll + 1}: `, roll);
      rollTotal = rollTotal + roll;
      if (roll === 20) {
        embed.addField(`CRIT!   ${d20emoji}`, '\u200b');
      }
      if (roll === 1) {
        embed.addField('Crit FAIL!   🎲', '\u200b');
      }
    }
    embed.addField('Total Roll: ', rollTotal);
    message.embed(embed);
  }
};

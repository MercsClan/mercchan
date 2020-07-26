const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class TicTacToeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'tictactoe',
      group: 'games',
      memberName: 'tictactoe',
      description: 'Creates a game of tictactoe',
      examples: ['!tictactoe'],
    });
  }
  run(msg) {
    let embed = new MessageEmbed();
    embed.setTitle('Tic-Tac-Toe');
    embed.setDescription(' 1 | 2 | 3 \n 4 | 5 | 6 \n 7 | 8 | 9 ');
    return msg.embed(embed);
  }
};

const { Command } = require('discord.js-commando');

module.exports = class ClanInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'claninfo',
      aliases: ['clan-info'],
      group: 'admin',
      memberName: 'claninfo',
      description: 'Get Information on Mercs Clan',
    });
  }

  run(message){
    let embed = new Discord.MessageEmbed()
    .setTitle(`Information about ${this.client.guilds.cache.}`)
      return message.embed()
  }
};

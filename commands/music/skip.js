const { Command } = require('discord.js-commando');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip', 'next'],
      memberName: 'skip',
      group: 'music',
      description: 'Skip the current playing song',
      guildOnly: true,
    });
  }

  //Set permissions
  hasPermission(message) {
    if (
      message.member.roles.cache.some((r) =>
        ['⚔️ Commander', '💎 Premium Members'].includes(r.name)
      )
    )
      return true;
    return 'Command for Premium Members Only';
  }

  run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply(
        'You must be in a voice channel to use this command'
      );

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('There is no song playing right now!');
    }
    message.guild.musicData.songDispatcher.end();
  }
};

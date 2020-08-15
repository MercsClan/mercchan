const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end'],
      group: 'music',
      memberName: 'leave',
      guildOnly: true,
      description: 'Leaves voice channel if in one',
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
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply('Join a channel and try again');
      return;
    } else if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      message.reply('There is no song playing right now!');
      return;
    } else if (!message.guild.musicData.queue) {
      message.reply('There are no songs in queue');
      return;
    } else if (message.guild.musicData.songDispatcher.paused) {
      message.guild.musicData.songDispatcher.resume();
      setTimeout(() => {
        message.guild.musicData.songDispatcher.end();
      }, 100);
      message.guild.musicData.queue.length = 0;
      return;
    } else {
      message.guild.musicData.songDispatcher.end();
      message.guild.musicData.queue.length = 0;
      return;
    }
  }
};

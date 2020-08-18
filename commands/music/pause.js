const { Command } = require('discord.js-commando');

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: ['resume'],
      memberName: 'pause',
      group: 'music',
      description: 'Pause the current playing song',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 3,
      },
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
      return message.say('There is no song playing right now!');
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `You must be in the same voice channel as the bot's in order to use that!`
      );
      return;
    }

    if (!message.guild.musicData.isPaused) {
      message.guild.musicData.isPaused = true;
      message.guild.musicData.songDispatcher.pause();
      message.say('Song paused');
    } else {
      message.guild.musicData.isPaused = false;
      message.guild.musicData.songDispatcher.resume();
    }
  }
};

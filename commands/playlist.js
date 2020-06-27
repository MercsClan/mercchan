const Discord = require('discord.js');
const Util = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core-discord');
const queue = new Map();

module.exports.run = async (client, message, args) => {
  const youtube = new YouTube(process.env.YOUTUBEAPIKEY);
  const serverQueue = queue.get(message.guild.id);
  const embed = new Discord.RichEmbed().setColor('#808080');
  let link = args[0];
  if (!link) {
    return errors.noYoutubeLink(message);
  }
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) {
    embed.setColor('#ffff00');
    embed.setDescription('You need to be in a voice channel to play music!');
    return message.channel.send(embed);
  }
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT')) {
    embed.setColor('#ffff00');
    embed.setDescription(
      'Cannot connect to your voice channel, make sure I have the proper permissions!'
    );
    return message.channel.send(embed);
  }
  if (!permissions.has('SPEAK')) {
    embed.setColor('#ffff00');
    embed.setDescription(
      'Cannot speak in this voice channel, make sure I have the proper permissions!'
    );
    return message.channel.send(embed);
  }

  if (serverQueue && !serverQueue.playing && !args[0]) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return message.react('▶');
  }

  const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    const playlist = await youtube.getPlaylist(url);
    const videos = await playlist.getVideos();
    let videonum = 0;
    for (const video of videos) {
      try {
        ++videonum;
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message, voiceChannel, true);
      } catch (error) {
        console.log(error);
        videos.shift();
      }
    }
    embed.setColor('#808080');
    embed.setDescription(
      `✅ [${playlist.title}](${playlist.url}) - ${videonum} songs have been added to the queue!`
    );
    return message.channel.send(embed);
  } else {
    try {
      var video = await youtube.getVideo(url);
    } catch (error) {
      try {
        var videos = await youtube.searchVideos(searchString, 1);
        video = await youtube.getVideoByID(videos[0].id);
      } catch (err) {
        console.error(err);
        embed.setColor('#ffff00');
        embed.setDescription('No search results were found.');
        return message.channel.send(embed);
      }
    }
    return handleVideo(video, message, voiceChannel);
  }
};

async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  const embed = new Discord.RichEmbed().setColor('#808080');
  console.log(video);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    requested: message.author,
    duration: video.duration,
  };

  console.log(song.duration);

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 1,
      playing: true,
    };
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      const embed = new Discord.RichEmbed().setColor('#808080');
      console.timeLog(error);
      embed.setColor('#ffff00');
      embed.setDescription(`Could not join the voice channel: ${error}`);
      console.error(`Could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send(embed);
    }
  } else {
    if (!serverQueue.loop) {
      serverQueue.songs.push(song);
    }
    console.log(serverQueue.songs);
    if (playlist) {
      return;
    } else {
      const embed = new Discord.RichEmbed().setColor('#808080');
      embed.setColor('#808080');
      embed.setDescription(
        `✅ [${song.title}](${song.url}) has been added to the queue! [${song.requested}]`
      );
      return message.channel.send(embed);
    }
  }
  return;
}

async function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  const embed = new Discord.RichEmbed().setColor('#808080');
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .playOpusStream(
      await ytdl(song.url, {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25,
      })
    )
    .on('end', (reason) => {
      if (reason == 'Stream is not generating quickly enough.') {
        dispatcher.end();
        console.log('Song ended!');
      } else {
        console.log(reason);
      }
      if (serverQueue.loop && reason == 'Skip command used!') {
        serverQueue.loop = false;
        serverQueue.songs.shift();
      } else if (!serverQueue.loop) {
        serverQueue.songs.shift();
      }
      play(guild, serverQueue.songs[0]);
    })
    .on('error', (error) => console.error(error));

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  const nptext = new Discord.RichEmbed()
    .setColor('#808080')
    .setTitle('Now Playing')
    .setDescription(`[${song.title}](${song.url}) [${song.requested}]`);

  serverQueue.textChannel.send(nptext);
}

function shuffle(songs) {
  var j, temp, i;
  for (i = songs.length - 1; i > 1; i--) {
    j = Math.floor(Math.random() * (i + 1));
    while (j == 0) {
      j = Math.floor(Math.random() * (i + 1));
    }
    temp = songs[i];
    songs[i] = songs[j];
    songs[j] = temp;
  }
}

module.exports.help = {
  name: 'playlist',
  description: 'Play a youtube playlist',
  usage: 'playlist [Youtube Link]',
};

const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YOUTUBEAPIKEY);

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      aliases: ["play-song", "add"],
      memberName: "play",
      group: "music",
      description: "Play any song or playlist from youtube",
      guildOnly: true,
      clientPermissions: ["SPEAK", "CONNECT"],
      throttling: {
        usages: 2,
        duration: 5,
      },
      args: [
        {
          key: "query",
          prompt: "What song or playlist would you like to listen to?",
          type: "string",
          validate: function (query) {
            return query.length > 0 && query.length < 200;
          },
        },
      ],
    });
  }

  async run(message, { query }) {
    const voiceChannel = message.member.voice.channel;
    console.log(message.guild.musicData);
    if (!voiceChannel) return message.say("Join a channel and try again");

    if (
      // if the user entered a youtube playlist url
      query.match(
        /^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/
      )
    ) {
      const playlist = await youtube.getPlaylist(query).catch(function () {
        return message.say("Playlist is either private or it does not exist!");
      });
      // add 10 as an argument in getVideos() if you choose to limit the queue
      const videosObj = await playlist.getVideos().catch(function () {
        return message.say(
          "There was a problem getting one of the videos in the playlist!"
        );
      });
      for (let i = 0; i < videosObj.length; i++) {
        if (videosObj[i].raw.status.privacyStatus == "private") {
          continue;
        } else {
          try {
            const video = await videosObj[i].fetch();
            // this can be uncommented if you choose to limit the queue
            // if (message.guild.musicData.queue.length < 10) {
            //

            message.guild.musicData.queue.push(
              constructSongObj(video, voiceChannel)
            );

            // } else {
            //   return message.say(
            //     `I can't play the full playlist because there will be more than 10 songs in queue`
            //   );
            // }
          } catch (err) {
            console.error(err);
          }
        }
      }
      if (message.guild.musicData.isPlaying == false) {
        message.guild.musicData.isPlaying = true;
        return playSong(message.guild.musicData.queue, message);
      } else if (message.guild.musicData.isPlaying == true) {
        return message.say(
          `Playlist - :musical_note:  ${playlist.title} :musical_note: has been added to queue`
        );
      }
    }

    // This if statement checks if the user entered a youtube url, it can be any kind of youtube url
    if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
      query = query
        .replace(/(>|<)/gi, "")
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      const id = query[2].split(/[^0-9a-z_\-]/i)[0];
      const video = await youtube.getVideoByID(id).catch(function () {
        return message.say(
          "There was a problem getting the video you provided!"
        );
      });
      // // can be uncommented if you don't want the bot to play live streams
      // if (video.raw.snippet.liveBroadcastContent === 'live') {
      //   return message.say("I don't support live streams!");
      // }
      // // can be uncommented if you don't want the bot to play videos longer than 1 hour
      // if (video.duration.hours !== 0) {
      //   return message.say('I cannot play videos longer than 1 hour');
      // }
      // // can be uncommented if you want to limit the queue
      // if (message.guild.musicData.queue.length > 10) {
      //   return message.say(
      //     'There are too many songs in the queue already, skip or wait a bit'
      //   );
      // }
      message.guild.musicData.queue.push(constructSongObj(video, voiceChannel));
      if (
        message.guild.musicData.isPlaying == false ||
        typeof message.guild.musicData.isPlaying == "undefined"
      ) {
        message.guild.musicData.isPlaying = true;
        return playSong(message.guild.musicData.queue, message);
      } else if (message.guild.musicData.isPlaying == true) {
        return message.say(`${video.title} added to queue`);
      }
    }
  }
};
function playSong(queue, message) {
  const classThis = this; // use classThis instead of 'this' because of lexical scope below
  queue[0].voiceChannel
    .join()
    .then(function (connection) {
      const dispatcher = connection
        .play(
          ytdl(queue[0].url, {
            quality: "highestaudio",
          })
        )
        .on("start", function () {
          message.guild.musicData.songDispatcher = dispatcher;
          dispatcher.setVolume(message.guild.musicData.volume);
          message.guild.musicData.nowPlaying = queue[0];
          return queue.shift();
        })
        .on("finish", function () {
          if (queue.length >= 1) {
            return classThis.playSong(queue, message);
          } else {
            message.guild.musicData.isPlaying = false;
            message.guild.musicData.nowPlaying = null;
            message.guild.musicData.songDispatcher = null;
            if (message.guild.me.voice.channel) {
              return message.guild.me.voice.channel.leave();
            }
          }
        })
        .on("error", function (e) {
          message.say("Cannot play song");
          console.error(e);
          message.guild.musicData.queue.length = 0;
          message.guild.musicData.isPlaying = false;
          message.guild.musicData.nowPlaying = null;
          message.guild.musicData.songDispatcher = null;
          return message.guild.me.voice.channel.leave();
        });
    })
    .catch(function (e) {
      console.error(e);
      return message.guild.me.voice.channel.leave();
    });
}
const constructSongObj = (video, voiceChannel) => {
  let duration = formatDuration(video.duration);
  if (duration == "00:00") duration = "Live Stream";
  return {
    url: `https://www.youtube.com/watch?v=${video.raw.id}`,
    title: video.title,
    rawDuration: video.duration,
    duration,
    thumbnail: video.thumbnails.high.url,
    voiceChannel,
  };
};
// prettier-ignore
function formatDuration(durationObj) {
    const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
      durationObj.minutes ? durationObj.minutes : '00'
    }:${
      (durationObj.seconds < 10)
        ? ('0' + durationObj.seconds)
        : (durationObj.seconds
        ? durationObj.seconds
        : '00')
    }`;
    return duration;
  }

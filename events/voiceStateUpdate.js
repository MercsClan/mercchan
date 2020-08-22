const { MessageEmbed, Structures } = require('discord.js');

module.exports = async (oldState, newState, mercchan) => {
  try {
    if (
      newState.channelID === '342428152645287947' &&
      oldState.channelID !== '342428152645287947'
    ) {
      const user = newState.member.user;
      const title = newState.member.roles.highest.name;
      const channel = await mercchan.channels.fetch('731692862323818538');

      let embed = new MessageEmbed();
      if (title === '@everyone') {
        embed.setTitle(`${user.username} Joined Wanting To Play`);
      } else {
        embed.setTitle(`${title} ${user.username} Joined Wanting To Play`);
      }
      embed.setColor(newState.member.roles.highest.hexColor);
      embed.setThumbnail(await user.avatarURL());
      await channel.send(embed);
    }
    if (
      newState.channelID === '745268727746134147' &&
      oldState.channelID !== '745268727746134147'
    ) {
      const user = newState.member.user;
      const title = newState.member.roles.highest.name;
      const channel = await mercchan.channels.fetch('745398796975865996');

      let embed = new MessageEmbed();
      if (title === '@everyone') {
        embed.setTitle(`${user.username} is in the cockpit.`);
      } else {
        embed.setTitle(`${title} ${user.username} is in the cockpit.`);
      }
      embed.setColor(newState.member.roles.highest.hexColor);
      embed.setThumbnail(await user.avatarURL());
      await channel.send(embed);
    }
    if (
      newState.member.user.bot &&
      !newState.channelID &&
      newState.guild.musicData.songDispatcher &&
      newState.member.user.id == mercchan.user.id
    ) {
      newState.guild.musicData.queue.length = 0;
      newState.guild.musicData.songDispatcher.end();
      return;
    }
    if (
      newState.member.user.bot &&
      newState.channelID &&
      newState.member.user.id == mercchan.user.id &&
      !newState.selfDeaf
    ) {
      newState.setSelfDeaf(true);
    }
  } catch (err) {
    console.log(err);
  }
};

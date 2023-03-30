const Discord = require("discord.js");
const chalk = require("chalk");
const config = require("../configs/config");

module.exports = async (client, oldState, newState) => {
  if (
    oldState.channelId !== config.wantingToPlayChannel &&
    newState.channelId === config.wantingToPlayChannel
  ) {
    const member = newState.member;
    const activity = member.presence.activities[0];
    let mins = 0;

    if (activity && activity.type === 0) {
      const startedPlaying = activity.timestamps?.start;
      if (startedPlaying) {
        const now = new Date();
        const started = new Date(startedPlaying);
        const difference = now - started;
        mins = Math.floor(difference / 1000 / 60);
      }
    }
    const embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: member.displayName,
        iconURL: member.displayAvatarURL(),
      })
      .setTitle(`Wants To Play`)
      .setDescription(activity ? activity.name : `Any Games`)
      .setFooter({
        text: activity
          ? `Been playing for ${mins} minutes.`
          : `No Game Detected`,
      })
      .setColor(member.roles.highest.hexColor)
      .addFields(
        {
          name: `<:coolthum:1090083178393370684> Rank:`,
          value: `${member.roles.highest.name}`,
          inline: true,
        },
        {
          name: `<:mercs:394883427205120011> Joined:`,
          value: `${member.joinedAt.toLocaleDateString("en-US")}`,
          inline: true,
        },
        {
          name: `<:nitro:1091080875749408918>  Boosting:`,
          value: `${
            member.premiumSince
              ? member.premiumSince
              : `<:pepekms:1090083454105944195>  Nope`
          }`,
          inline: false,
        }
      );
    const channel = await client.channels.fetch(
      config.wantingToPlayNotificationChannel
    );
    channel.send({ embeds: [embed] });
  }
};

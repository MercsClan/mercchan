const Discord = require("discord.js");
const os = require("node:os");
const utils = require("../../utils/utils");
const config = require("../../configs/config");

module.exports = {
  name: "Ping",
  aliases: ["P"],
  description: "Shows the ping pong infos",

  async execute(client, message, args, cmd) {
    await message.channel.sendTyping();

    const embed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setAuthor({
        name: `Pong!`,
        iconURL: client.user.displayAvatarURL({ size: 1024 }),
      })
      .addFields(
        {
          name: `📡 Ping:`,
          value: `${client.ws.ping}ms`,
          inline: true,
        },
        {
          name: `💾 Memory:`,
          value: `${utils.numberWithCommas(
            Math.round(process.memoryUsage().rss / 1024 / 1024)
          )}/${utils.numberWithCommas(
            Math.round(os.totalmem() / 1024 / 1024)
          )}MB`,
          inline: true,
        },
        {
          name: `⏳ Uptime:`,
          value: utils.timestamp(client.readyTimestamp),
          inline: false,
        }
      )
      .setFooter({
        text: `Commanded by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ size: 1024 }),
      });

    await message.reply({ embeds: [embed] });
  },
};

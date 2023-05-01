const Discord = require("discord.js");
const chalk = require("chalk");
const config = require("../configs/config");

module.exports = async (client, message) => {
  if (
    message.channel.type === Discord.ChannelType.DM ||
    message.author.bot ||
    message.system
  )
    return;

  //Command Handler
  if (message.content.toLowerCase().startsWith(config.prefix)) {
    const neededPermissions = [
      "ViewChannel",
      "SendMessages",
      "EmbedLinks",
      "ReadMessageHistory",
    ];

    if (
      !message.channel
        .permissionsFor(message.guild.members.me)
        .has(neededPermissions)
    )
      return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command =
      client.MessageCommands.get(cmd) ||
      client.MessageCommands.find(
        (c) => c.aliases && c.aliases.map((a) => a.toLowerCase()).includes(cmd)
      );

    if (command) {
      try {
        command.execute(client, message, args, cmd);
      } catch (error) {
        console.error(chalk.bold.redBright(error));
      }
    }
  }
};

const Discord = require("discord.js");
const chalk = require("chalk");

module.exports = async (client) => {
  await client.user.setPresence({
    activities: [
      {
        name: `your mom shower`,
        type: Discord.ActivityType.Watching,
      },
    ],
    status: "online",
  });

  console.log(chalk.bold.greenBright(`${client.user.tag} is online.`));
};

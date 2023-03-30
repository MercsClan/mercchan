const Discord = require("discord.js");
const chalk = require("chalk");

module.exports = async (client) => {
  await client.user.setPresence({
    activities: [
      {
        name: `7/11 was a part time job`,
        type: Discord.ActivityType.Watching,
      },
    ],
    status: "online",
  });

  console.log(chalk.bold.greenBright(`${client.user.tag} is online.`));
};

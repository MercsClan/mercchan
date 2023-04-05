const Discord = require("discord.js");
const chalk = require("chalk");
const { connect } = require("mongoose");
const databaseUrl = process.env.DATABASEURL;

module.exports = async (client) => {
  //Database Connection
  if (!databaseUrl) return;

  await connect(databaseUrl || "", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (connect) {
    console.log(chalk.bold.bgBlack.green(`Database connected.`));
  } else {
    console.log(chalk.bold.bgBlack.red(`Database connection failed.`));
    return;
  }

  //Presence Status
  await client.user.setPresence({
    activities: [
      {
        name: `7/11 was a part time job`,
        type: Discord.ActivityType.Watching,
      },
    ],
    status: "online",
  });

  console.log(chalk.bold.greenBright(`🟢 ${client.user.tag} is online.`));
};

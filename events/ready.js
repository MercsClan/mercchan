const Discord = require("discord.js");
const chalk = require("chalk");
const { Sequelize } = require("sequelize");
const databaseUrl = process.env.DATABASEURL;

module.exports = async (client) => {
  //Database Connection
  if (!databaseUrl) return;

  const sequelize = new Sequelize(databaseUrl, {
    logging: false,
    dialect: "mysql",
  });

  try {
    await sequelize.authenticate();
    console.log(chalk.bold.bgBlack.green(`Database connected.`));
  } catch (err) {
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

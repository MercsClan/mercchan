require("dotenv").config();
const Discord = require("discord.js");
const chalk = require("chalk");
const fs = require("node:fs");
const config = require("./configs/config");
const commands = [];
const discordToken = process.env.DISCORDTOKEN;

const commandFiles = fs
  .readdirSync(`./commands/interactions/`)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/interactions/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new Discord.REST({ version: "10" }).setToken(discordToken);

(async () => {
  try {
    console.log(
      chalk.bold.yellowBright(
        `Reloading ${commands.length} application (/) commands.`
      )
    );

    const data = await rest.put(
      Discord.Routes.applicationCommands(config.clientId),
      { body: commands }
    );

    console.log(
      chalk.bold.greenBright(
        `Successfully reloaded ${data.length} application (/) commands.`
      )
    );
  } catch (error) {
    console.error(chalk.bold.redBright(error));
  }
})();

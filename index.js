const Discord = require("discord.js");
const chalk = require("chalk");
const fs = require("node:fs");
require("dotenv").config();

const token = process.env.DISCORDTOKEN;
//Discord Client
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

// Event Handler
console.log(chalk.bold.yellowBright("Loading Events"));
const events = fs
  .readdirSync(`./events/`)
  .filter((file) => file.endsWith(".js"));
for (const file of events) {
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
  delete require.cache[require.resolve(`./events/${file}`)];
}

// // Message Command Handler
console.log(chalk.bold.yellowBright("Loading Message Commands"));
client.MessageCommands = new Discord.Collection();
const messageCommands = fs
  .readdirSync(`./commands/messages/`)
  .filter((files) => files.endsWith(".js"));
for (const file of messageCommands) {
  const command = require(`./commands/messages/${file}`);
  client.MessageCommands.set(command.name.toLowerCase(), command);
  delete require.cache[require.resolve(`./commands/messages/${file}`)];
}

// // // Slash Command Handler
console.log(chalk.bold.yellowBright("Loading Slash Commands"));
client.SlashCommands = new Discord.Collection();
const slashCommands = fs
  .readdirSync(`./commands/interactions/`)
  .filter((files) => files.endsWith(".js"));
for (const file of slashCommands) {
  const command = require(`./commands/interactions/${file}`);
  client.SlashCommands.set(command.data.name, command);
  delete require.cache[require.resolve(`./commands/interactions/${file}`)];
}

// Crash Reporter
process.on("unhandledRejection", (reason, p) => {
  console.log(chalk.bold.redBright("[ERROR] :: Unhandled Rejection"));
  console.log(reason?.stack, p);
});

process.on("uncaughtException", (err, origin) => {
  console.log(chalk.bold.redBright("[ERROR] :: Caught Exception"));
  console.log(err?.stack, origin);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(chalk.bold.redBright("[ERROR] :: Uncaught Exception"));
  console.log(err?.stack, origin);
});

// Discord Client login
client.login(token);

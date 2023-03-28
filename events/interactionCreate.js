const chalk = require("chalk");

module.exports = async (client, interaction) => {
  // Command Handler
  if (interaction.isChatInputCommand()) {
    const command = client.SlashCommands.get(interaction.commandName);
    if (command) {
      try {
        command.execute(client, interaction);
      } catch (error) {
        console.error(chalk.bold.redBright(error));
        return await interaction
          .reply({
            content:
              error.message.length > 4096
                ? error.message.slice(0, 4093) + "..."
                : error.message,
            ephemeral: true,
          })
          .catch(() => null);
      }
    }
  }
};

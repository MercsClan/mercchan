const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("servers")
    .setDescription("Lists all servers the bot is in."),

  async execute(client, interaction) {
    let serverList = [];
    client.guilds.cache.forEach((guild) => {
      serverList.push({
        name: guild.name,
        id: guild.id,
        members: guild.memberCount,
        owner: guild.ownerId,
        createdAt: guild.createdAt,
        joinedAt: guild.joinedAt,
      });
    });
    const top5Servers = serverList
      .sort((a, b) => b.members - a.members)
      .slice(0, 5);
    const embed = new Discord.EmbedBuilder().setTitle(
      "Merc Chans Top 5 Servers"
    );
    top5Servers.forEach((server) => {
      embed.addFields({
        name: server.name,
        value: `👨‍👩‍👧‍👦 Members: ${server.members} \n ✳️ Owner: ${
          server.owner
        }  \n ⌚ Server Created: ${new Date(
          server.createdAt
        ).toLocaleDateString("en-US")} \n ❤️ MC Joined: ${new Date(
          server.joinedAt
        ).toLocaleDateString("en-US")} \n `,
        inline: true,
      });
    });
    await interaction.reply({ embeds: [embed] }).catch(() => null);
  },
};

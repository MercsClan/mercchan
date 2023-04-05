const Discord = require("discord.js");
const itadkey = process.env.ITAD_API_KEY;
const config = require("../../configs/config");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("deal")
    .setDescription("Checks current prices of video games.")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("What game do you want to search?")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("ephemeral")
        .setDescription("Hides the bot's reply from others. (Default: False)")
    ),

  async execute(client, interaction) {
    const ephemeral = interaction.options.getBoolean("ephemeral");
    await interaction.deferReply({ ephemeral: ephemeral });

    const game = interaction.options.getString("game");
    const encodedGame = encodeURI(game);
    const lookupRes = await fetch(
      `https://api.isthereanydeal.com/v02/game/plain/?key=${itadkey}&title=${encodedGame}`
    );
    const plain = await lookupRes.json();
    const codedGame = plain.data?.plain;
    if (!codedGame) {
      const embed = new Discord.EmbedBuilder().setDescription(
        `Could not find a match for ${game}. Maybe try a different spelling.`
      );
      await interaction.editReply({ embeds: [embed] });
    } else {
      const active = plain[".meta"]?.active;
      if (active && codedGame !== "") {
        const gameInfoPromise = fetch(
          `https://api.isthereanydeal.com/v01/game/info/?key=${itadkey}&plains=${codedGame}`
        );
        const storeInfoPromise = fetch(
          `https://api.isthereanydeal.com/v01/game/prices/?key=${itadkey}&plains=${codedGame}&shops=epic%2Cgog%2Chumblestore%2Cmicrosoft%2Corigin%2Csteam%2Cuplay%2C&region=us&country=US`
        );
        const [gameResponse, storeResponse] = await Promise.all([
          gameInfoPromise,
          storeInfoPromise,
        ]);
        const gameInfo = await gameResponse.json();
        const storeInfo = await storeResponse.json();
        const steamReview = gameInfo.data[codedGame]?.reviews?.steam
          ? `Steam Review: ${gameInfo.data[codedGame]?.reviews?.steam?.perc_positive}% ${gameInfo.data[codedGame]?.reviews?.steam?.text}`
          : "No Steam Reviews Found";

        const embed = new Discord.EmbedBuilder()
          .setAuthor({
            name: `View Price History`,
            url: gameInfo.data[codedGame].urls.history,
          })
          .setTitle(gameInfo.data[codedGame].title)
          .setURL(gameInfo.data[codedGame].urls.game)
          .setThumbnail(gameInfo.data[codedGame].image)
          .setDescription(steamReview);

        const storeButtons = [];
        storeInfo?.data[codedGame]?.list?.forEach((store) => {
          embed.addFields({
            name: `${config.dealEmoji[store.shop.name]} ${store.shop.name}`,
            value: ` Current Price: ${store.price_new} \n Regular Price: ${store.price_old}`,
            inline: true,
          });
          const button = new Discord.ButtonBuilder()
            .setStyle(Discord.ButtonStyle.Link)
            .setLabel(`${store.shop.name} $${store.price_new}`)
            .setURL(store.url);
          storeButtons.push(button);
        });
        const row = new Discord.ActionRowBuilder().addComponents(
          ...storeButtons
        );
        storeButtons.length > 0
          ? await interaction.editReply({ embeds: [embed], components: [row] })
          : await interaction.editReply({ embeds: [embed] });
      }
    }
  },
};

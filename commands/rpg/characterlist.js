const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const db = require('../../Firebase/firebase.js');
const { doc } = require('../../Firebase/firebase.js');

module.exports = class characterList extends Command {
  constructor(client) {
    super(client, {
      name: 'characterlist',
      aliases: ['clist'],
      memberName: 'characterlist',
      group: 'rpg',
      description: 'List Characters',
      throttling: {
        usages: 1,
        duration: 1,
      },
      clientPermissions: ['SEND_MESSAGES'],
    });
  }

  async run(message) {
    const args = message.content.split(' ');
    let discordID;
    let discordUser;
    let mentionedUser;

    if (args[1] && message.guild) {
      // Lookup mentionied users ID
      mentionedUser = message.mentions.users.first();
      if (mentionedUser) {
        discordID = mentionedUser.id;
        discordUser = mentionedUser.username;
      } else {
        return message.say('Discord Member Not Found');
      }
    } else {
      // Use command author
      discordID = message.author.id;
      discordUser = message.author.username;
    }

    //Query user Characters
    const rpgCollection = db.collection('rpg');
    const userChars = await rpgCollection
      .where('discordID', '==', discordID)
      .orderBy('order')
      .get();

    const messageContent = [];
    const charQty = userChars.size;
    let embed = new MessageEmbed();
    embed.setTitle(`${discordUser} has ${charQty} Characters`);
    if (charQty === 0) {
      return message.say(`${discordUser} has no characters`);
    } else {
      userChars.forEach((doc) => {
        embed.addField(`Character ${doc.data().order}:`, doc.data().name);
        messageContent.push(
          `${discordUser} ${doc.data().order}: ${doc.data().name}`
        );
      });
    }

    if (message.guild) {
      message.embed(embed);
    } else {
      if (args[1])
        message.say(
          'Cannot lookup other users in DM, here are your characters: '
        );
      messageContent.forEach((content) => {
        message.say(content);
      });
    }
  }
};

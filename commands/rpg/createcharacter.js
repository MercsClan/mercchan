const { Command } = require('discord.js-commando');
const db = require('../../Firebase/firebase.js');
const { doc } = require('../../Firebase/firebase.js');

module.exports = class createCharacter extends Command {
  constructor(client) {
    super(client, {
      name: 'createcharacter',
      aliases: ['create-char'],
      memberName: 'createcharacter',
      group: 'rpg',
      description: 'Create a new character',
      throttling: {
        usages: 1,
        duration: 1,
      },
      clientPermissions: ['SEND_MESSAGES'],
    });
  }

  hasPermission(message) {
    const approvedRoles = ['⚔️ Commander'];
    const title = message.member.roles.highest.name;
    if (approvedRoles.includes(title)) return true;
    return 'Command under development';
  }

  async run(message) {
    // Check if message is DM to prevent spamming channels with character creation
    if (message.channel.type != 'dm')
      return message.say('Use command as DM to MercChan');

    //Query user Characters
    const rpgCollection = db.collection('rpg');
    let charOrder;
    const userChars = await rpgCollection
      .where('discordID', '==', message.author.id)
      .get();

    // Check for too many characters
    const charQty = userChars.size;
    if (charQty >= 3) {
      return message.say(`You already have ${charQty} characters.`);
    } else {
      const args = message.content.split(' ');
      let charName = `${args[1]} ${args[2]}`;
      if (!args[1])
        return message.say('Please use command followed by character name');

      // Add new character
      const newCharacter = rpgCollection.add({
        discordTag: message.author.tag,
        discordID: message.author.id,
        name: charName,
        order: charOrder,
      });
    }
  }
};

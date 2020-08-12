const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const db = require('../../Firebase/firebase.js');

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
    if (message.author.id === '188090196833599488') return true;
    return 'This feature is still under development';
  }

  async run(message) {
    // Check if message is DM to prevent spamming channels with character creation
    if (message.channel.type != 'dm')
      return message.say('Use command as DM to MercChan');

    const userCollection = db.collection('rpg');

    // Lookup current users characters
    const userDoc = await userCollection
      .doc('users')

      .get()
      .catch((error) => {
        console.error(error);
      });

    console.log(userDoc.data());

    return;

    // //Add Character
    // const doc = message.author.id;
    // db.collection('events').doc(doc).set({
    //   name: charName,
    //   hp: 'TBD',
    // });

    // const embed = new MessageEmbed();
  }
};

const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
require('dotenv').config({ path: '../.env' });
const botToken = process.env.DISCORDTOKEN;

//ROLE CHANNEL MANAGEMENT
const stored_msg_id = '745025770589651068';
//Custom EmojiList
//const emojiTarkov = message.emojis.cache.get('745022162670452879');

//Role List
const roleTarkov = '745022672152559642';
const roleRocket = '745023066995949689';
const roleFlight = '745023174579585165';

client.on('messageReactionAdd', async (reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  // Now the message has been cached and is fully available
  console.log(
    `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
  );
  // The reaction is now also fully available and the properties will be reflected accurately:
  console.log(
    `${reaction.count} user(s) have given the same reaction to this message!`
  );
});

// if (reaction.message.id != stored_msg_id) {
//   return console.log('Wrong message');
// } else {
//   console.log('Correct Message');

//   if (reaction.emoji.name === '⚽') {
//     user.roles.add(roleRocket);
//   } else if (reaction.emoji.name === '✈️') {
//     user.roles.add(roleFlight);
//   } else {
//     console.log('No Role Found');
//   }
// }

client.login(botToken);

module.exports = async (reaction, user, mercchan) => {
  // Message for Reactions
  const stored_msg_id = '745025770589651068';
  const nUser = await reaction.message.guild.members.cache.get(user.id);

  // EmojiList
  const emojiMercs = 'mercs';
  const emojiRocket = '⚽';
  const emojiFlightSim = '✈️';
  const emojiFallGuys = 'fg';
  const emojiFactory = 'fb';
  const emojoiAmongUs = 'among';

  //Role List
  const roleRecruit = '323965184857210890';
  const roleRocket = '745023066995949689';
  const roleFlight = '745023174579585165';
  const roleFallGuys = '745081929153511554';
  const roleFactory = '745090173242703962';
  const roleAmongUs = '759837704237088808';

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      return;
    }
  }

  //Only looking for Reactions from our welcome message
  if (reaction.message.id != stored_msg_id) {
  } else {
    if (reaction.emoji.name === emojiRocket) {
      nUser.roles.add(roleRecruit);
    } else if (reaction.emoji.name === emojiRocket) {
      nUser.roles.add(roleRocket);
    } else if (reaction.emoji.name === emojiFlightSim) {
      nUser.roles.add(roleFlight);
    } else if (reaction.emoji.name === emojiFallGuys) {
      nUser.roles.add(roleFallGuys);
    } else if (reaction.emoji.name === emojiFactory) {
      nUser.roles.add(roleFactory);
    } else if (reaction.emoji.name === emojoiAmongUs) {
      nUser.roles.add(roleAmongUs);
    } else {
      console.log(`No Role Found: ${reaction.emoji.id}`);
    }
  }
};

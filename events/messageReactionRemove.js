module.exports = async (reaction, user, mercchan) => {
  // Message for Reactions
  const stored_msg_id = '745025770589651068';
  const nUser = await reaction.message.guild.members.cache.get(user.id);

  // EmojiList
  const emojiTarkov = 'EFT';
  const emojiRocket = '⚽';
  const emojiFlightSim = '✈️';
  const emojiFallGuys = 'fg';

  //Role List
  const roleTarkov = '745022672152559642';
  const roleRocket = '745023066995949689';
  const roleFlight = '745023174579585165';
  const roleFallGuys = '745081929153511554';

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
      nUser.roles.remove(roleRocket);
    } else if (reaction.emoji.name === emojiFlightSim) {
      nUser.roles.remove(roleFlight);
    } else if (reaction.emoji.name === emojiTarkov) {
      nUser.roles.remove(roleTarkov);
    } else if (reaction.emoji.name === emojiFallGuys) {
      nUser.roles.remove(roleFallGuys);
    } else {
      console.log(`No Role Found: ${reaction.emoji.id}`);
    }
  }
};

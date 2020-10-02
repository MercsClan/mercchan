module.exports = async (reaction, user, mercchan) => {
  // Message for Reactions
  const stored_msg_id = '745025770589651068';
  const nUser = await reaction.message.guild.members.cache.get(user.id);
  const emojiRoles = require('./emojiRoles');

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
    //Recruits
    if (reaction.emoji.name === emojiRoles.emojiRecruit) {
      nUser.roles.add(emojiRoles.roleRecruit);
      //Rocket League
    } else if (reaction.emoji.name === emojiRoles.emojiRocket) {
      nUser.roles.add(emojiRoles.roleRocket);
      //Flight Sim
    } else if (reaction.emoji.name === emojiRoles.emojiFlightSim) {
      nUser.roles.add(emojiRoles.roleFlight);
      //Fall Guys
    } else if (reaction.emoji.name === emojiRoles.emojiFallGuys) {
      nUser.roles.add(emojiRoles.roleFallGuys);
      //Factory Building
    } else if (reaction.emoji.name === emojiRoles.emojiFactory) {
      nUser.roles.add(emojiRoles.roleFactory);
      //Among Us
    } else if (reaction.emoji.name === emojiRoles.emojiAmongUs) {
      nUser.roles.add(emojiRoles.roleAmongUs);
      //Halo
    } else if (reaction.emoji.name === emojiRoles.emojiHalo) {
      nUser.roles.add(emojiRoles.roleHalo);
      //Invalid Emoji
    } else {
      console.log(`No Role Found: ${reaction.emoji.id}`);
      reaction.users.remove(nUser);
    }
  }
};

const db = require('../Firebase/firebase');

module.exports = async (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'general'
  ); // OR Welcome channel from MercChan dashboard
  if (!channel) return;
  channel.send(
    `Hi ${member}, I'm Merc-Chan, welcome to the Mercs Clan.   Use !help to checkout what I can do.`
  );
  member.roles
    .add(member.guild.roles.cache.find((role) => role.name === 'recruit'))
    .catch(console.error);
};

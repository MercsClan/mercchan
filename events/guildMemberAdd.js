const { MessageEmbed } = require('discord.js');

module.exports = async (member) => {
  console.log(member);
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'general'
  ); // OR Welcome channel from MercChan dashboard
  if (!channel) return;
  const message = new MessageEmbed();
  message.setTitle(`New Recruit: ${member.displayName}`);
  message.setThumbnail(member.user.avatarURL());
  message.setColor(member.displayHexColor);

  const recruitRole = await member.guild.roles.cache.find(
    (role) => role.name === 'Recruit'
  );
  member.roles.add(recruitRole).catch(console.error);

  channel.send(message);
  channel.send(
    `Hi ${member}, I'm Merc-Chan, welcome to the Mercs Clan.   Use !help to checkout what I can do.`
  );
};

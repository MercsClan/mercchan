const db = require('../Firebase/firebase');

module.exports = async (guild) => {
  console.log(guild);
  if (guild.available) {
    db.collection('mercchan-guilds').doc(guild.id).set({
      prefix: '!',
      memberAddChannel: 'general',
      auditChannel: 'audit-log',
      ownerId: guild.ownerID,
      createdDate: guild.createdAt.toIsoString(),
      mercchanJoined: guild.joinedAt.toIsoString(),
      description: guild.description,
      memberCount: guild.memberCount,
      name: guild.name,
      region: guild.region,
      inviteCode: guild.vanityURLCode,
    });

    const auditChannel = guild.channels.cache.find(
      (channel) => channel.name == 'audit-log'
    );

    if (!auditChannel) {
      return console.log('Cannot find audit-log channel');
    }
    auditChannel.send(`Merc-Chan was added to Guild: ${guild.name}`);
  }
};

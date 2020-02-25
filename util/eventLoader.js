const reqEvent = event => require(`../events/${event}`);

module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  client.on('channelDelete', reqEvent('channelDelete'));
  client.on('messageDelete', reqEvent('messageDelete'));
  client.on('guildCreate', reqEvent('guildCreate'));
  client.on('guildDelete', reqEvent('guildDelete'));

  /*
	channelCreate
channelDelete
channelPinsUpdate
channelUpdate
clientUserGuildSettingsUpdate
clientUserSettingsUpdate
debug
disconnect
emojiCreate
emojiDelete
emojiUpdate
error
guildBanAdd
guildBanRemove
guildCreate
guildDelete
guildIntegrationsUpdate
guildMemberAdd
guildMemberAvailable
guildMemberRemove
guildMembersChunk
guildMemberSpeaking
guildMemberUpdate
guildUnavailable
guildUpdate
message
messageDelete
messageDeleteBulk
messageReactionAdd
messageReactionRemove
messageReactionRemoveAll
messageUpdate
presenceUpdate
rateLimit
ready
reconnecting
resume
roleCreate
roleDelete
roleUpdate
typingStart
typingStop
userNoteUpdate
userUpdate
voiceStateUpdate
warn
webhookUpdate

*/
};

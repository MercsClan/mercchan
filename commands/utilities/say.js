const { Command } = require('discord.js-commando');
const { MessageEmbed, MessageManager } = require('discord.js');

module.exports = class sayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'say',
      aliases: ['announce'],
      group: 'utilities',
      memberName: 'say',
      description: 'Makes a server announcement',
      examples: ['!say "title" "announcement"'],
      guildOnly: true,
      clientPermissions: ['SEND_MESSAGES'],
      hidden: true,
      args: [
        {
          key: 'title',
          prompt: 'What is the announcement title?',
          type: 'string',
        },
        {
          key: 'announcement',
          prompt: 'What is the announcement?',
          type: 'string',
        },
      ],
    });
  }

  hasPermission(message) {
    const approvedRoles = ['⚔️ Commander', '🛡 Division Commander'];
    if (approvedRoles.includes(title)) return true;
    return 'Only Division Commanders and above may create events.';
  }

  async run(message, { title, announcement }) {
    const thumb = message.guild.emojis.cache.get('394883427205120011');

    const announceChannel = message.guild.channels.cache.find(
      (channel) => channel.name == 'announcements'
    );

    if (!announceChannel) {
      message.say('Cannot find announcement channel');
      return console.log('Cannot find announcement channel');
    }

    const embed = new MessageEmbed()
      .setTitle(title)
      //.setThumbnail(thumb)
      .addField(announcement, '\u200b');

    //Do we want to store announcements for auto deletion later?
    const sentMessage = await announceChannel.send(embed);
  }
};

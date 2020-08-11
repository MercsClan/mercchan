const { Command } = require('discord.js-commando');

module.exports = class PurgeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      aliases: ['clear'],
      group: 'utilities',
      memberName: 'purge',
      description: 'Deletes the last x messages from channel',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 10,
      },
      clientPermissions: ['READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES'],
      userPermissions: ['MANAGE_MESSAGES'],
      hidden: true,
      args: [
        {
          key: 'count',
          label: 'number of messages',
          prompt:
            'How many messages do you want to delete? Limit of up to 100.',
          type: 'integer',
          min: 1,
          max: 100,
        },
      ],
    });
  }

  hasPermission(message) {
    const approvedRoles = ['⚔️ Commander'];
    const title = message.member.roles.highest.name;
    return approvedRoles.includes(title) ? true : 'Only Commanders may purge.';
  }

  async run(msg, { count }) {
    count++;
    try {
      const messages = await msg.channel.messages.fetch({
        limit: count > 100 ? 100 : count,
      });
      await msg.channel.bulkDelete(messages, true);
      return null;
    } catch {
      return msg.reply('No messages less than 14 days old to purge.');
    }
  }
};

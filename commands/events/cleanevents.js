const { Command } = require('discord.js-commando');
const { MessageEmbed, GuildMember, MessageManager } = require('discord.js');
require('dotenv').config();
const db = require('../../Firebase/firebase.js');

module.exports = class eventCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cleanevents',
      aliases: ['cleanevent', 'r-events', 'c-events'],
      group: 'events',
      memberName: 'cleanevents',
      description: 'Removes Old Event Roles and Channels',
      examples: ['!cleanevents 2'],
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      args: [
        {
          key: 'daysOld',
          prompt: 'How many days past the event for it to be removed?',
          type: 'integer',
        },
      ],
    });
  }

  hasPermission(message) {
    const approvedRoles = ['⚔️ Commander'];
    const title = message.member.roles.highest.name;
    if (approvedRoles.includes(title)) return true;
    return 'Only Division Commanders and above may create events.';
  }

  async run(message, { daysOld }) {
    const eventsDB = db.collection('events');
    const today = new Date();
    today.setDate(today.getDate() - daysOld);

    getExpiredEvents(db);

    async function getExpiredEvents(db) {
      const expiredEvents = await eventsDB
        .where('active')
        .where('date', '<', today.toISOString())
        .get()
        .catch((error) => {
          console.log(error);
        });
      if (expiredEvents.empty) {
        message.reply('No Expired Events');
        return;
      } else {
        expiredEvents.forEach((doc) => {
          console.log(doc.data().game);

          //Delete Channel
          let expiredChannel = message.guild.channels.cache
            .find((c) => c.id === doc.data().channelID)
            .delete()
            .then(message.reply(`${doc.data().role} channel removed`))
            .catch((error) => {
              console.error(error);
            });

          // Delete Role
          let expiredRole = message.guild.roles.cache
            .find((r) => r.id === doc.data().roleID)
            .delete()
            .then(message.reply(`${doc.data().role} role removed`))
            .catch((error) => {
              console.error(error);
            });
        });
      }
    }
  }
};

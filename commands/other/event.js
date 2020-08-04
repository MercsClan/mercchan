const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { default: Axios } = require('axios');
require('dotenv').config();
const APIKey = process.env.IGDB_API_KEY;
const axios = require('axios');
const dayjs = require('dayjs');
const db = require('./../../Firebase/firebase.js');
//const firebase = require('firebase');

module.exports = class eventCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'event',
      aliases: ['party', 'tournament'],
      group: 'other',
      memberName: 'event',
      description: 'Announces a server event',
      examples: ['!event "game" "number of players" "day" "time"'],
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      args: [
        {
          key: 'queryGame',
          prompt: 'What game would you like to play?',
          type: 'string',
        },
        {
          key: 'queryEventCapacity',
          prompt: 'How many players?',
          type: 'integer',
        },
        {
          key: 'queryEventDay',
          prompt: 'What Day?',
          type: 'string',
        },
        {
          key: 'queryEventTime',
          prompt: 'What Time?',
          type: 'string',
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

  async run(
    message,
    { queryGame, queryEventCapacity, queryEventDay, queryEventTime }
  ) {
    let eventDate;

    if (queryEventDay.toLowerCase() === 'today') {
      eventDate = dayjs().format('MM/DD/YYYY');
    } else if (queryEventDay.toLowerCase() === 'tomorrow') {
      eventDate = dayjs().add(1, 'day').format('MM/DD/YYYY');
    } else {
      eventDate = dayjs(queryEventDay)
        .year(dayjs().year())
        .format('MM/DD/YYYY');
    }

    let eventTime;
    let eventTimeHour;
    let eventTimeMinute;

    const eventTimePeriod =
      queryEventTime[queryEventTime.length - 2] +
      queryEventTime[queryEventTime.length - 1];

    if (!queryEventTime.includes(':')) {
      eventTimeHour = queryEventTime.replace(eventTimePeriod, '');
      eventTimeMinute = '00';
      eventTime = queryEventTime.replace(
        eventTimePeriod,
        `:00 ${eventTimePeriod}`
      );
    } else {
      eventTime = queryEventTime.replace(
        eventTimePeriod,
        ` ${eventTimePeriod}`
      );
      const tempTime = queryEventTime.split(':');
      eventTimeHour = tempTime[0];
      eventTimeMinute = tempTime[1].replace(eventTimePeriod, '');
    }

    //TODO: Do we need an expiration field?
    //eventTime = dayjs(eventDateTime).format('h:mm A');
    //const eventExpiration = dayjs(eventDateTime).add('day', 7);

    const embed = new MessageEmbed();
    const baseURL = 'https://api-v3.igdb.com';
    await axios
      .get(`${baseURL}/games`, {
        headers: {
          'user-key': APIKey,
          'contenct-type': 'application/json',
        },
        params: {
          fields: 'name, cover.url',
          search: queryGame,
        },
      })
      .then((response) => {
        embed.setTitle(`${queryGame} Event`);
        if (response.data.length > 0) {
          const coverart = `https:${response.data[0].cover.url}`;
          embed.setThumbnail(coverart);
        }
        embed.setColor('#bb070e');
        embed.addFields(
          {
            name: 'When:',
            value: dayjs(eventDate).format('dddd, MMM D'),
            inline: true,
          },
          {
            name: '\u200b',
            value: eventTime,
            inline: true,
          }
        );
        embed.addField('Number of Players:', queryEventCapacity);
        embed.addField('\u200b', 'Drop us an emoji if you can make it');
        embed.setFooter(`Event created by: ${message.author.username}`);
      })
      .catch((error) => {
        console.log('Something went wrong');
      });

    //Convert Date and Time for the DB
    let eventDateTime = dayjs(eventDate);
    eventDateTime = dayjs(eventDateTime).set('hour', eventTimeHour);
    eventDateTime = dayjs(eventDateTime).set('minute', eventTimeMinute);
    const dateDB = dayjs(eventDateTime).toISOString();

    //Test Channel
    //const channelID = '739860151573413888';
    //Events Channel
    const channelID = '739295017855746119';

    const channel = message.guild.channels.cache.get(channelID);
    const sentMessage = await channel.send(embed);
    console.log('Message Sent');

    const eventRole = `event_${queryGame}`;
    const eventChannel = eventRole;

    // Creates a new role for the event
    await message.guild.roles.create({
      data: { name: eventRole, permissions: [] },
    });

    const eventRoleObj = message.guild.roles.cache.find(
      (role) => role.name === eventRole
    );

    // Creates a new text channel for the event
    await message.guild.channels.create(eventChannel, {
      type: 'text',
      parent: '740294137286492271',
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: eventRoleObj,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
      ],
    });

    //TODO: Needs to be the message ID of the message in the Events channel
    const dbDOC = sentMessage.id;

    // Send Event to the Database
    db.collection('events').doc(dbDOC).set({
      capcity: queryEventCapacity,
      date: dateDB,
      game: queryGame,
      role: eventRole,
      eventID: eventRoleObj.id,
    });
  }
};

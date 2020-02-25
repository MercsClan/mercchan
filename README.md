# mercchan

Mercs Discord Bot

## Usage

| Command     | Args          | Permissions     | Description                                                     |
| ----------- | ------------- | --------------- | --------------------------------------------------------------- |
| !addrole    | @user, role   | MANAGE_ROLES    | Adds a user to a role                                           |
| !advice     |               |                 | Get advice from Merc Chan!                                      |
| !avatar     | @user         |                 | Retrieves given users avatar                                    |
| !ban        | @user         | BAN_MEMBERS     | Bans a user                                                     |
| !botinfo    |               |                 | Gets bot statistics                                             |
| !claninfo   |               |                 | Gets guild statistics                                           |
| !help       |               |                 | Gets available commands                                         |
| !invite     |               |                 | Generates an invite link                                        |
| !kick       | @user, reason | MANAGE_MESSAGES | Kicks a given user from discord                                 |
| !lockdown   | time          | MANAGE_MESSAGES | Locks a text channel for a given time in ms                     |
| !mute       | @user, reason | MANAGE_MESSAGES | Mutes a given user                                              |
| !poll       | question      |                 | Creates a poll with upvote/downvote emotes                      |
| !purge      | numberToPurge | MANAGE_MESSAGES | Purges comments less than 40 days old up to the provided amount |
| !reload     | command       | OWNER           | Reloads a commands .js file                                     |
| !removerole | @user, role   | MANAGE_ROLES    | Removes a user from a role                                      |
| !report     | @user, reason |                 | Reports a given user for a given reason                         |
| !say        | message       | ADMINISTRATOR   | Say a message as the bot                                        |
| !shutdown   | role, @user   | OWNER           | Shuts down bot instance                                         |
| !tarkov     | map           |                 | Fetches link to Tarkov map for given link                       |
| !terminate  | role, @user   | OWNER           | Bot leaves guild and terminates instance                        |
| !unmute     | @user         | MANAGE_MESSAGES | Unmutes a muted user                                            |
| !userinfo   | @user         |                 | Gets info on a given user                                       |

## Requirements

Must have your discord token as an environment variable named DISCORDTOKEN. See .env.example

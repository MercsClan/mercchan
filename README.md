# Merc-Chan

Mercs Discord Bot

## Usage

| Command          | Args                           | Permissions                    | Description                                   |
| ---------------- | ------------------------------ | ------------------------------ | --------------------------------------------- |
| !deal            | Game                           | Anyone                         | Search IsThereAnyDeal for game deals.a        |
| !weather         | zipcode                        | Anyone                         | Returns local weather for your zipcode        |
| !humble          | Game, # of players, Time, Date | COMMANDER / Division Commander | Creates a new event in the channel            |
| !rocketleague    | Steam ID                       | Anyone                         | Checks Rocket League stats for a Steam name   |
| **Music**        |                                |                                |                                               |
| !play            | Youtube Playlist or Song       | COMMANDER / PREMIUM MEMBER     | Plays a Youtube playlist                      |
| !skip            |                                | COMMANDER / PREMIUM MEMBER     | Skips 1 track in playlist                     |
| !skipto          | Playlist Index                 | COMMANDER / PREMIUM MEMBER     | Skips forward to designated track in playlist |
| !queue           |                                | COMMANDER / PREMIUM MEMBER     | Displays the playlist queue                   |
| !leave           |                                | COMMANDER / PREMIUM MEMBER     | Removes MercChan from the voice channel       |
| !pause           |                                | COMMANDER / PREMIUM MEMBER     | Pauses or Resumes playing music               |
| **Events**       |                                |                                |                                               |
| !event           | Game, # of players, Time, Date | COMMANDER / Division Commander | Creates a new event in the channel            |
| !cleanevents     | Number of days past the event  | COMMANDER / Division Commander | Deletes Role and Channel associate with event |
| **RPG**          |                                |                                |                                               |
| !roll            | [# of dice]d[size of dice]     | Anyone                         | Replies with dice rolls                       |
| !coinflip        |                                | Anyone                         | Replies with a head or tails coin image       |
| !charactercreate | Charcter first and last name   | Anyone                         | Creates an RPG character in the database      |
| !characterlist   | mention user (optional)        | Anyone                         | Replies with a list of RPG characters created |
| **Admin**        |                                |                                |                                               |
| !reboot          |                                | COMMANDER                      | Sends webhook to reboot MercChan              |
| !kill            |                                | COMMANDER                      | Kills MercChan Process                        |
| !purge           | # (1-100)                      | COMMANDER                      | Deletes the last x messages from channel      |
| !say             | title, announcement            | COMMANDER                      | Sands a message to the announcements channel  |

## Requirements

[Discord Token](https://discordapp.com/developers/applications/)  
[Youtube API Key](https://developers.google.com/youtube/registering_an_application)  
[IsThereAnyDeal API Key](https://isthereanydeal.com/apps/)  
[IGDB API Key](https://www.igdb.com/api)  
[Open Weather Map API Key](https://openweathermap.org/appid)

See .env.example

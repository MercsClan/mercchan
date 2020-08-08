const puppeteer = require('puppeteer');
const baseUrl = 'https://rlstats.net/profile/Steam/';

async function fetchStats(playerName) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${baseUrl}${playerName}`);
    const result = await page.evaluate(() => {
      let stats = document.querySelector('.block-stats').innerHTML;
      let currentReward = document.querySelector('.block-reward').innerHTML;
      let currentRanks = document.querySelector('.block-skills').innerHTML;
      return { stats, currentReward, currentRanks };
    });
    await browser.close();
    //split HTML results on new line
    let stats = result.stats.split('\n');
    let rewards = result.currentReward.split('\n');
    let ranks = result.currentRanks.split('\n');

    //Parse stats, regex digits only
    let wins = stats[11].match(/(\d+)/g).join(',');
    let mvps = stats[12].match(/(\d+)/g).join(',');
    let goals = stats[13].match(/(\d+)/g).join(',');
    let assists = stats[14].match(/(\d+)/g).join(',');
    let saves = stats[15].match(/(\d+)/g).join(',');
    let shots = stats[16].match(/(\d+)/g).join(',');

    //Regex matches htmls tags like <td> </td>
    const htmlTagRegex = /<(.*?)>/g;

    //Parse ranks
    let soloduelrank = ranks[9].replace(htmlTagRegex, '');
    let solodueldiv = ranks[15].replace(htmlTagRegex, '');
    let soloduelmmr = ranks[21].replace(htmlTagRegex, '');
    let doublesrank = ranks[9].replace(htmlTagRegex, '');
    let doublesdiv = ranks[15].replace(htmlTagRegex, '');

    const playerObject = {
      stats: {
        Wins: wins,
        MVPs: mvps,
        Goals: goals,
        Assists: assists,
        Saves: saves,
        Shots: shots,
      },
      ranks: {
        'Solo-Duel': {
          rank: soloduelrank,
          div: solodueldiv,
          mmr: soloduelmmr,
        },
        Doubles: {
          rank: soloduelrank,
          div: solodueldiv,
          mmr: '500',
        },
        Standard: {
          rank: soloduelrank,
          div: solodueldiv,
          mmr: '500',
        },
        'Solo-Standard': {
          rank: soloduelrank,
          div: solodueldiv,
          mmr: '500',
        },
        Rumble: {
          rank: soloduelrank,
          div: solodueldiv,
          mmr: '500',
        },
        DropShot: {
          rank: soloduelrank,
          div: solodueldiv,
          mmr: '500',
        },
        Hoops: {
          rank: soloduelrank,
          div: solodueldiv,
          mmr: '500',
        },
        SnowDay: {
          rank: soloduelrank,
          div: solodueldiv,
          mmr: '500',
        },
      },
    };
    console.log(playerObject);
    return playerObject;
  } catch (err) {
    console.log(err);
    return null;
  }
}

//fetchStats('explosionbae');
module.exports = fetchStats;

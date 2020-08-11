const puppeteer = require('puppeteer');
const baseUrl = 'https://rlstats.net/profile/Steam/';
const os = require('os');

async function fetchStats(playerName) {
  try {
    let browser;
    if (os.arch() === 'arm') {
      browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        headless: true,
      });
    } else {
      browser = await puppeteer.launch();
    }

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

    let soloDuelRank = ranks[9].replace(htmlTagRegex, '');
    let doublesRank = ranks[10].replace(htmlTagRegex, '');
    let standardRank = ranks[11].replace(htmlTagRegex, '');
    let soloStandardRank = ranks[12].replace(htmlTagRegex, '');

    let soloDuelDiv = ranks[15].replace(htmlTagRegex, '');
    let doublesDiv = ranks[16].replace(htmlTagRegex, '');
    let standardDiv = ranks[17].replace(htmlTagRegex, '');
    let soloStandardDiv = ranks[18].replace(htmlTagRegex, '');

    let soloDuelMmr = ranks[21].replace(htmlTagRegex, '');
    let doublesMmr = ranks[22].replace(htmlTagRegex, '');
    let standardMmr = ranks[23].replace(htmlTagRegex, '');
    let soloStandardMmr = ranks[24].replace(htmlTagRegex, '');

    let hoopsRank = ranks[54].replace(htmlTagRegex, '');
    let rumbleRank = ranks[55].replace(htmlTagRegex, '');
    let dropShotRank = ranks[56].replace(htmlTagRegex, '');
    let snowDayRank = ranks[57].replace(htmlTagRegex, '');

    let hoopsDiv = ranks[60].replace(htmlTagRegex, '');
    let rumbleDiv = ranks[61].replace(htmlTagRegex, '');
    let dropShotDiv = ranks[62].replace(htmlTagRegex, '');
    let snowDayDiv = ranks[63].replace(htmlTagRegex, '');

    let hoopsMmr = ranks[66].replace(htmlTagRegex, '');
    let rumbleMmr = ranks[67].replace(htmlTagRegex, '');
    let dropShotMmr = ranks[68].replace(htmlTagRegex, '');
    let snowDayMmr = ranks[69].replace(htmlTagRegex, '');

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
          rank: soloDuelRank,
          div: soloDuelDiv,
          mmr: soloDuelMmr,
        },
        Doubles: {
          rank: doublesRank,
          div: doublesDiv,
          mmr: doublesMmr,
        },
        Standard: {
          rank: standardRank,
          div: standardDiv,
          mmr: standardMmr,
        },
        'Solo-Standard': {
          rank: soloStandardRank,
          div: soloStandardDiv,
          mmr: soloStandardMmr,
        },
        Rumble: {
          rank: rumbleRank,
          div: rumbleDiv,
          mmr: rumbleMmr,
        },
        DropShot: {
          rank: dropShotRank,
          div: dropShotDiv,
          mmr: dropShotMmr,
        },
        Hoops: {
          rank: hoopsRank,
          div: hoopsDiv,
          mmr: hoopsMmr,
        },
        SnowDay: {
          rank: snowDayRank,
          div: snowDayDiv,
          mmr: snowDayMmr,
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

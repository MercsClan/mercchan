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
    let stats = result.stats.split('\n');
    let wins = stats[11].match(/(\d+)/g).join(',');
    let mvps = stats[12].match(/(\d+)/g).join(',');
    let goals = stats[13].match(/(\d+)/g).join(',');
    let assists = stats[14].match(/(\d+)/g).join(',');
    let saves = stats[15].match(/(\d+)/g).join(',');
    let shots = stats[16].match(/(\d+)/g).join(',');

    const playerObject = {
      stats: {
        wins: wins,
        mvps: mvps,
        goals: goals,
        assists: assists,
        saves: saves,
        shots: shots,
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

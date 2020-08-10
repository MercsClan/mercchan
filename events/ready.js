const os = require('os');
module.exports = async (mercchan) => {
  console.log(`Logged in as ${mercchan.user.tag}, ${mercchan.user.id}`);
  mercchan.user.setActivity(`with your mom`);
  const auditchannel = await mercchan.channels.fetch('367468320821215234');
  await auditchannel.send(`MercChan Successfully Started on ${os.hostname()}`);
};

module.exports.run = async (client, message, args) => {
  const adviceArray = [''];
  const advice = adviceArray[Math.floor(Math.random() * adviceArray.length)];
  return message.channel.send(advice).catch(err => console.log(err));
};

module.exports.help = {
  name: 'advice',
  description: 'Get some advice from Merc-Chan',
  usage: 'advice'
};

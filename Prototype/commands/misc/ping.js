module.exports = {
  name: `ping`,
  description: `Pong!`,
  // devOnly: Boolean,
  // testOnly: Boolean,
  // accessible: Boolean,
  // options: Object[],
  callback: (tyrantP, interaction) => {
    interaction.reply(`Pong! ${tyrantP.ws.ping}ms`);
  },
};

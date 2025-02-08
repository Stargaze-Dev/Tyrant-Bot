const { devs, testServer } = require(`../../../config.json`);
module.exports = (tyrantP) => {
  try {
    tyrantP.on(`messageCreate`, (message) => {
      switch (message.author) {
        /*case :
          if (message.content.includes(`Tyrant`)) {
            message.reply(`Hi ${message.author}, hows my code running?`);
          }*/
        case message.author.bot == false:
          if (message.content === `Hello Tyrant`) {
            message.reply(`Hello ${message.author}`);
          } else if (message.content.includes(`Tyrant` && `online`)) {
            message.reply(`Yeah, I am.`);
          } else if (message.content.includes(`Tyrant`)) {
            message.reply(`Are you talking to me, or about me?`);
          }
          break;
        default:
          break;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

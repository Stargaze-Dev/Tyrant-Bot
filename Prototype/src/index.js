require('dotenv').config();
const { Client, IntentsBitField } = require("discord.js");

const TyrantP = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

TyrantP.on('ready', (pClient) => {
  console.log(`${pClient.user.tag} is online.`);
});

TyrantP.on('messageCreate', (message) => {
  switch (message.author.bot) {
    case false:
      if (message.content === 'Hello') {
        message.reply(`Hello ${message.author}`);
      }
      break;
    default:
      break;
    }
});

TyrantP.login(process.env.PTOKEN);
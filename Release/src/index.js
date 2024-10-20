require('dotenv').config();
const { Client, IntentsBitField } = require("discord.js");

const TyrantR = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

TyrantR.on('ready', (rClient) => {
  console.log(`${rClient.user.tag} is online.`);
});

TyrantR.login(process.env.RTOKEN);
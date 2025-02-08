require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const tyrantR = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

tyrantR.on("ready", (rClient) => {
  console.log(`${rClient.user.tag} is online.`);
});

tyrantR.login(process.env.RTOKEN);

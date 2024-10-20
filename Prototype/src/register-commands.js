require('dotenv').config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "hey",
    description: 'Replies with "hey!"',
  },
  {
    name: "ping",
    description: 'Pong!',
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.PTOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        `${process.env.PCLIENT_ID}`,
        `${process.env.GUILD_ID}`
      ),
      { body: commands }
    );
    console.log("Slash commands registered successfully!");
  } catch (error) {
    console.log(`There was an error performing this task: ${error}`);
  }
})();

require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  /*{
    name: "hey",
    description: 'Replies with "hey!"',
  },
  {
    name: "ping",
    description: 'Pong!',
  },*/

  {
    name: "add",
    description: "Adds two numbers",
    options: [
      {
        name: "first-number",
        description: "The first number you want to add",
        type: ApplicationCommandOptionType.Number,
        choices: [
            {
                name: 'one',
                value: 1,
            },
            {
                name: 'two',
                value: 2,
            },
            {
                name: 'three',
                value: 3,
            },
            {
                name: 'four',
                value: 4,
            },
            {
                name: 'five',
                value: 5,
            },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "The second number you want to add",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
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

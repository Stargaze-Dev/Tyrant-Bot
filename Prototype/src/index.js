require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder, } = require("discord.js");

const TyrantP = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

TyrantP.on("ready", (pClient) => {
  console.log(`${pClient.user.tag} is online.`);
});

TyrantP.on("messageCreate", (message) => {
  switch (message.author.bot) {
    case false:
      if (message.content === "Hello") {
        message.reply(`Hello ${message.author}`);
      }
      break;
    default:
      break;
  }
});

TyrantP.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
  console.log(interaction.commandName);
  switch (interaction.commandName) {
    case "hey":
      interaction.reply(`Hey ${interaction.member.nickname}!`);
      break;
    case "ping":
      interaction.reply(`Pong!`);
      break;
    case "add":
      const num1 = interaction.options.get("first-number")?.value;
      const num2 = interaction.options.get("second-number")?.value;
      interaction.reply(`The sum of ${num1} & ${num2} is ${num1 + num2}`);
      break;
    case "embed":
      const embed = new EmbedBuilder()
        .setTitle("This is an embed title")
        .setDescription("This is an embed description")
        .setColor(`Random`)
        .addFields(
          {
            name: "Field Title",
            value: "Some value",
            inline: true,
          },
          {
            name: "Second Field Title",
            value: "Some other value",
            inline: true,
          }
        );
      interaction.reply({ embeds: [embed] });
      break;
    default:
      break;
  }
});

TyrantP.on("messageCreate", (message) => {
  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("This is an embed title")
      .setDescription("This is an embed description")
      .setColor(`Random`)
      .addFields(
        {
          name: "Field Title",
          value: "Some value",
          inline: true,
        },
        {
          name: "Second Field Title",
          value: "Some other value",
          inline: true,
        }
      );
    message.channel.send({embeds: [embed]});
  }
});

TyrantP.login(process.env.PTOKEN);

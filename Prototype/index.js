require(`dotenv`).config();
const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
  Activity,
} = require(`discord.js`);
const eventHandler = require("../Prototype/handlers/eventHandler");

const tyrantP = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: `a solo challenge to break Stargaze's sanity`,
    type: ActivityType.Competing,
  },
  {
    name: `Finding help, I took the jokes too far`,
    type: ActivityType.Custom,
  },
  {
    name: `to Stargaze complain about how I don't work properly :P`,
    type: ActivityType.Listening,
  },
  {
    name: `with Stargaze's sanity`,
    type: ActivityType.Playing,
  },
  {
    name: `the pain Stargaze experiences when my code doesn't work`,
    type: ActivityType.Streaming,
    url: `https://www.youtube.com/watch?v=H8jdqm9Ntl4`, //Aaaaauuuugh
  },
  {
    name: `the prototyping of Tyrant with Stargaze`,
    type: ActivityType.Streaming,
    url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, //Rick Roll
  },
  {
    name: `the making of Tyrant with Stargaze`,
    type: ActivityType.Streaming,
    url: `https://www.youtube.com/watch?v=Ksj_GfzE6Mg`, //'All The Small Things' but Pikmin
  },
  {
    name: `the progression of Tyrant with Stargaze`,
    type: ActivityType.Streaming,
    url: `https://www.youtube.com/watch?v=aWfOalyu-RQ`, //Kirby falling off a cliff
  },
  {
    name: `the creation of Tyrant with Stargaze`,
    type: ActivityType.Streaming,
    url: `https://www.youtube.com/watch?v=2lEpY6hIg6w`, //Fart on my roommates door
  },
  {
    name: `the development of Tyrant with Stargaze`,
    type: ActivityType.Streaming,
    url: ``, //TBD
  },
  {
    name: `Stargaze cry`,
    type: ActivityType.Watching,
    url: ``,
  },
];

tyrantP.on(`ready`, (pClient) => {
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    console.log(random);
    tyrantP.user.setActivity(status[random]);
  }, 600000);
});

/*tyrantP.on(`interactionCreate`, async (interaction) => {
  console.log(interaction);
  console.log(interaction.commandName);
  await interaction.deferReply({ ephemeral: true });
  try {
    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.reply({
        content: `The role; ${role}, does not appear to exist`,
      });
      return;
    }
    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`You have left ${role}.`);
      return;
    }
    await interaction.member.roles.add(role);
    await interaction.editReply(`You have joined ${role}`);
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.isButton) {
      switch (interaction.commandName) {
        case `hey`:
          interaction.reply(`Hey ${interaction.member.nickname}!`);
          break;
        case `ping`:
          interaction.reply(`Pong!`);
          break;
        case `add`:
          const num1 = interaction.options.get(`first-number`)?.value;
          const num2 = interaction.options.get(`second-number`)?.value;
          interaction.reply(`The sum of ${num1} & ${num2} is ${num1 + num2}`);
          break;
        case `embed`:
          const embed = new EmbedBuilder()
            .setTitle(`This is an embed title`)
            .setDescription(`This is an embed description`)
            .setColor(`Random`)
            .addFields(
              {
                name: `Field Title`,
                value: `Some value`,
                inline: true,
              },
              {
                name: `Second Field Title`,
                value: `Some other value`,
                inline: true,
              }
            );
          interaction.reply({ embeds: [embed] });
          break;
        default:
          break;
      }
    }
  } catch (error) {}
});

tyrantP.on(`messageCreate`, (message) => {
  if (message.content === `embed`) {
    const embed = new EmbedBuilder()
      .setTitle(`This is an embed title`)
      .setDescription(`This is an embed description`)
      .setColor(`Random`)
      .addFields(
        {
          name: `Field Title`,
          value: `Some value`,
          inline: true,
        },
        {
          name: `Second Field Title`,
          value: `Some other value`,
          inline: true,
        }
      );
    message.channel.send({ embeds: [embed] });
  }
});*/

eventHandler(tyrantP);

tyrantP.login(process.env.PTOKEN);

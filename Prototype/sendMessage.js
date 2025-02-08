require(`dotenv`).config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require(`discord.js`);

const tyrantP = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: `1239381730163687424`,
    label: `The Blues`,
  },
  {
    id: `1239381737146941512`,
    label: `The Greens`,
  },
  {
    id: `1239381383831617537`,
    label: `The Reds`,
  },
];

tyrantP.on(`ready`, async (pClient) => {
  try {
    const channel = await tyrantP.channels.cache.get(`1237225031122288700`);
    if (!channel) return;
    const row = new ActionRowBuilder();
    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });
    await channel.send({
      content: `Join a colour group with these roles`,
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(`There was an error; ${error}`);
    process.exit();
  }
});

tyrantP.login(process.env.PTOKEN);

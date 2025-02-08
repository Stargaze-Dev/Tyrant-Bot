const { devs, testServer } = require(`../../../config.json`);
const getLocalCommands = require(`../../utils/getLocalCommands`);
const name = require(`../ready/01registerCommands`);
module.exports = async (tyrantP, interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const localCommands = getLocalCommands();
  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );
    if (!commandObject) return;
    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: `Only my developers can run this command. Skedadle ya goober.`,
          ephemeral: true,
        });
        return;
      }
    }
    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: `This command can only be run in my test environment. Buh bye.`,
          ephemeral: true,
        });
        return;
      }
    }
    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: `You don't have the permissions to execute this command.`,
            ephemeral: true,
          });
          break;
        }
      }
    }
    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: `Not even I am allowed to do that.`,
            ephemeral: true,
          });
          break;
        }
      }
    }
    await commandObject.callback(tyrantP, interaction);
  } catch (error) {
    console.log(`There was en error running the command; "${name}". ${error}`);
  }
};

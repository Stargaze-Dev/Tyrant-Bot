module.exports = async (tyrantP, guildId) => {
  let applicationCommands;
  if (guildId) {
    const guild = await tyrantP.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  } else {
    applicationCommands = await tyrantP.application.commands;
  }
  await applicationCommands.fetch();
  return applicationCommands;
};

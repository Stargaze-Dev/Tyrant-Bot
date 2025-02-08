const { testServer } = require(`../../../config.json`);
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");
const consoleLog = require("./consoleLog");
module.exports = async (tyrantP) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      tyrantP,
      testServer
    );
    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;
      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );
      if (existingCommand) {
        if (localCommand.accessible) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`The command; "${name}" was deleted.`);
          continue;
        }
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          console.log(`The command; "${name}" was edited`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `Registration for the command "${name}" will be skipped as it is set as "deleted".`
          );
          continue;
        }
        await applicationCommands.create({
          name,
          description,
          options,
        });
        console.log(`Successfully registered the command "${name}".`);
      }
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};

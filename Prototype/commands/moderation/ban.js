const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require(`discord.js`);
module.exports = {
  /**
   * @param {Client} tyrantP
   * @param {Interaction} interaction
   */

  callback: async (tyrantP, interaction) => {
    const targetUserID = interaction.options.get(`target-user`).value;
    const reason =
      interaction.options.get(`reason`)?.value || "No reason provided";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserID);

    if (!targetUser) {
      await interaction.editReply(
        `The specified user ${targetUser} does not exist in this server.`
      );
      return;
    }
    if (targetUser.id === interaction.guild.ownerID) {
      await interaction.editReply(
        `You can't ban the owner of the server. Thems the rules.`
      );
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; //Target user's highest role
    
  },

  name: `ban`,
  description: `Bans a member from the server.`,
  // devOnly: Boolean,
  // testOnly: Boolean,
  // accessible: Boolean,
  options: [
    {
      name: `target-user`,
      description: `The user to be banned.`,
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: `reason`,
      description: `Why will they be banned?`,
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};

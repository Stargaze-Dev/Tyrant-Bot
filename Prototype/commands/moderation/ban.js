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

    const targetUserRolePosition = targetUser.roles.highest.position; //The highest role of the user targetted by the command
    const requestUserRolePosition = interaction.member.roles.highest.position; //The highest role of the user running the command
    const botRolePosition = interaction.guild.members.me.roles.highest.position; //The highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        `**Ban unsuccessful**\n**Target:** ${targetUser}\n**Error:** You cannot ban a user of the same or higher rank to yourself.`
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        `**Ban unsuccessful**\n**Target:** ${targetUser}\n**Error:** I cannot ban a user of the same or higher rank to myself`
      );
      return;
    }

    try {
      await targetUser.ban({ reason });
      await interaction.editReply(
        `**Ban successful**\n**Target:** ${targetUser}\n**Reason:** ${reason}`
      );
    } catch (error) {
      console.log(error);
    }
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

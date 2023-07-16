const { MessageEmbed } = require("discord.js");
const ec = require("../../settings/embed")
const permissions = [
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_INSIGHTS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  //"MANAGE_EMOJIS",
];

module.exports = {
  name: "permissions",
  description: "🛡️ | Shows All The Permissions Of The Mentioned One Or Yours",
  options: [
    {
      type: "USER",
      name: "mention",
      description: "Mention The One You Want To View Permissions Of",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const yes = "✅";
    const no = "❌";
    const s = "📛";
    const c = "♨️";

    let channel = interaction.channel;
    let member =
      interaction.options.getMember("mention") ||
      interaction.guild.members.cache.get(interaction.user.id);

    let description = `Server - ${s}\nCurrent Channel - ${c}\n\n${s} | ${c}\n`;

    let embed = new MessageEmbed()
      .setTitle(`${member.user.username}'s Permissions`)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor(ec.color)
    permissions.forEach((perm) => {
      description += `${member.permissions.has(perm) ? yes : no} | ${
        channel.permissionsFor(member.id).has(perm) ? yes : no
      } - ${caps(perm)}\n`;
    });
    embed.setDescription(description);

    return interaction.followUp({ embeds: [embed] });
  },
};

function caps(text) {
  return text
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b[a-zA-Z]/g, (m) => m.toUpperCase());
}
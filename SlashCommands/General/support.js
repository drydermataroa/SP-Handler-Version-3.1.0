const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const set = require("../../settings/settings");
const ec = require("../../settings/embed")

module.exports = {
  name: "support",
  description: "🚨 | Join the discord support server and get some help",
  run: async(client, interaction) => {
    const embed = new MessageEmbed()
      .setTitle('Bot Owner & Developer Support Server')
      .setColor(ec.color)
      .setDescription(`[Click to join the support server.](${set.supportInvite})`)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()

    const row = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Server Link")
      .setStyle("LINK")
      .setURL(`${set.supportInvite}`)
    ]);

    return interaction.followUp({ ephemeral: true, embeds: [embed], components: [row] });
  }
};
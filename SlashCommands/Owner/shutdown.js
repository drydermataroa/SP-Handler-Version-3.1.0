const { MessageEmbed } = require('discord.js');
const em = require("../../settings/embed")
const emoji = require("../../settings/emojis")

module.exports = {
    name: 'shutdown',
    aliases: ['forcestop'],
    description: '🔓 | Shutdowns your bot',
    ownerOnly: true,

    run: async(client, interaction, args) => {

      const shutdown = new MessageEmbed()
      .setTitle(`${emoji.sheild} **Going Offline** ${emoji.sheild}`)
      .setColor(em.yellow)
      .setDescription(`${emoji.success} | ${client.user.username} is shutting down now....`)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()
      client.destroy()

      interaction.followUp({ embeds: [shutdown]})
    }
}
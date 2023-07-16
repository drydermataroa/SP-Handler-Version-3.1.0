const { MessageEmbed } = require("discord.js")
const ec = require("../../settings/embed");

module.exports = {
  name: "first-message",
  description: "Get the first message in a channel",
  category: "Fun",
  emoji: "💬",
  run: async (client, message, args) => {
    const fetchmessages = await message.channel.messages.fetch({ limit: 1, after: 1 })
    const msg = fetchmessages.first()

    const embed = new MessageEmbed()
      .setDescription(`
      **Message Content:** ${msg.content}
      **Sent By:** ${msg.author}
      **Date sent:** <t:${parseInt(msg.createdTimestamp / 1000)}:R>
      **URL:** [Click Me](${msg.url})
      `)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setColor(ec.color)
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL() })
      .setTimestamp()
    message.reply({ embeds: [embed] })
  },
}

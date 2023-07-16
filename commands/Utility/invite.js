const { MessageEmbed } = require('discord.js')
const set = require("../../settings/settings")
const em = require("../../settings/embed")

module.exports = {
  name: 'invite',
  description: "Sends you the bot invite link.",
  emoji: "📚",
  
  run: async (client, message, args, user, guild) => {
    if (!message.guild.me.permissions.has('SEND_MESSAGES')) return
    if (
      !message.guild.me.permissions.has([
        'EMBED_LINKS',
        'ADD_REACTIONS',
        'SEND_MESSAGES',
        'READ_MESSAGE_HISTORY',
        'VIEW_CHANNEL',
      ])
    ) {
      return message.channel.send(`
        ❌ I require some Permissions!
  
        **I need the following Permissions to work on your Server:**
        EMBED_LINKS,
        ADD_REACTIONS, 
        SEND_MESSAGES, 
        READ_MESSAGE_HISTORY,
        VIEW_CHANNEL
  
        ⚠️ Please add me the right Permissions and re-run this Command!
    
        `)
    }
    message.channel.send({
      embeds: [new MessageEmbed()
        .setTitle(`Invite Bot`)
        .setColor(em.color)
        .setFooter({ text: `Thanks ${message.author.username} for supporting me!`})
        .setTimestamp()
        .setDescription(
          `[Click this to invite me](${set.botInvite})`,
        ),
      ]})
  },
}
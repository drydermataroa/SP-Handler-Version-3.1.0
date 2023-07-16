const client = require(`../../index`)
const guilds = require(`../../structures/Models/guild`)
const { MessageEmbed } = require("discord.js")
const emojis = require('../../settings/emojis')
const ec = require('../../settings/embed')

client.on("emojiCreate", async (emoji) => {
    const guild = await guilds.findOne({guildId: emoji.guild.id})
    if(!guild.logging) return;
    if(!emoji.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

    const AuditLogFetch = await emoji.guild.fetchAuditLogs({limit: 1, type: "EMOJI_CREATE"});
    const Entry = AuditLogFetch.entries.first();

    const embed = new MessageEmbed()
    .setTitle(`${emojis.clock} **Emoji Created!** ${emojis.clock}`)
    .setColor(ec.color)
    .setDescription(`> **Author:** <@${Entry.executor.id}>\n`)
    .addFields(
        { name: "**Emoji Name:**", value: `\`\`\`${emoji.name}\`\`\``, inline: true },
        { name: "**Emoji ID:**", value: `\`\`\`${emoji.id}\`\`\``, inline: true },
        { name: "**Preview Emoji:**", value: `${emoji}`, inline: false }
    )
    .setTimestamp()

    const logsChannel = emoji.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(logsChannel) {
        logsChannel.send({embeds: [embed]})
    }
})
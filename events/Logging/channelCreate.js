const client = require(`../../index`)
const guilds = require(`../../structures/Models/guild`)
const { MessageEmbed } = require("discord.js")
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

client.on("channelCreate", async (channel) => {
    const guild = await guilds.findOne({guildId: channel.guild.id})
    if(!guild.logging) return;
    if(!channel.guild) return;
    if(!channel.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

    const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_CREATE"});
    const Entry = AuditLogFetch.entries.first();
    const embed = new MessageEmbed()
    .setTitle(`${emojis.bell} **Channel Created!** ${emojis.bell}`)
    .setColor(ec.color)
    .setDescription(`> **Channel Created By:** <@${Entry.executor.id}>\n\n`)
    .addFields(
        { name: "**Channel Name:**", value: `\`\`\`${channel.name}\`\`\``, inline: true }, 
        { name: "**Channel ID:**", value: `\`\`\`${channel.id}\`\`\``, inline: true },
    )
    .setTimestamp()

    const logsChannel = channel.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(logsChannel) {
        logsChannel.send({embeds: [embed]})
    }
})
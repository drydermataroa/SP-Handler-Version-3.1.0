const client = require(`../../index`)
const guilds = require(`../../structures/Models/guild`)
const { MessageEmbed } = require("discord.js")
const emojis = require('../../settings/emojis')
const ec = require('../../settings/embed')

client.on("threadDelete", async (thread) => {
    const guild = await guilds.findOne({guildId: thread.guild.id})
    if(!guild.logging) return;
    if(!thread.guild) return;
    if(!thread.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

    const AuditLogFetch = await thread.guild.fetchAuditLogs({limit: 1, type: "THREAD_DELETE"});
    const Entry = AuditLogFetch.entries.first();
    const embed = new MessageEmbed()
    .setTitle(`${emojis.channel} **Thread Deleted!** ${emojis.channel}`)
    .setColor(ec.color)
    .setDescription(`> **Author:** <@${Entry.executor.id}>`)
    .addFields(
        { name: "**Thread Name:**", value: `\`\`\`${thread.name}\`\`\``, inline: true }, 
        { name: "**Thread ID:**", value: `\`\`\`${thread.id}\`\`\``, inline: true },
    )
    .setTimestamp()

    
    const logsChannel = thread.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(logsChannel) {
        logsChannel.send({embeds: [embed]})
    }
})
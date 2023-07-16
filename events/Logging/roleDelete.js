const client = require(`../../index`)
const guilds = require(`../../structures/Models/guild`)
const { MessageEmbed } = require("discord.js")
const emojis = require('../../settings/emojis')
const ec = require('../../settings/embed')

client.on("roleDelete", async (role) => {
    const guild = await guilds.findOne({guildId: role.guild.id})
    if(!guild.logging) return;
    if(!role.guild) return;
    if(!role.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
    

    const AuditLogFetch = await role.guild.fetchAuditLogs({limit: 1, type: "ROLE_DELETE"});
    const Entry = AuditLogFetch.entries.first();
    const embed = new MessageEmbed()
    .setTitle(`${emojis.bin} **Role Deleted!** ${emojis.bin}`)
    .setColor(ec.color)
    .setDescription(`> **Author:** ${Entry ? `<@${Entry.executor.id}>` : "No author"}`)
    .addFields(
        {name: "**Role Name:**", value: `\`\`\`${role.name}\`\`\``, inline: true }, 
        { name: "**Role ID:**", value: `\`\`\`${role.id}\`\`\``, inline: true },
    )
    .setTimestamp()

    
    const logsChannel = role.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(logsChannel) {
        logsChannel.send({embeds: [embed]})
    }
})
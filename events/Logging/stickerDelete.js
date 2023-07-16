const client = require(`../../index`)
const guilds = require(`../../structures/Models/guild`)
const { MessageEmbed } = require("discord.js")
const emojis = require('../../settings/emojis')
const ec = require('../../settings/embed')

client.on("stickerDelete", async (sticker) => {
    const guild = await guilds.findOne({guildId: sticker.guild.id})
    if(!guild.logging) return;
    if(!sticker.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

    const AuditLogFetch = await sticker.guild.fetchAuditLogs({limit: 1, type: "STICKER_DELETE"});
    const Entry = AuditLogFetch.entries.first();

    const embed = new MessageEmbed()
    .setTitle(`${emojis.bin} **Sticker Deleted!** ${emojis.bin}`)
    .setColor(ec.color)
    .setDescription(`> **Author:** <@${Entry.executor.id}>\n`)
    .addFields(
        { name: "**Sticker Name:**", value: `\`\`\`${sticker.name}\`\`\``, inline: true },
        { name: "**Sticker ID:**", value: `\`\`\`${sticker.id}\`\`\``, inline: true },
    )
    .setTimestamp()

    
    const logsChannel = sticker.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(logsChannel) {
        logsChannel.send({embeds: [embed]})
    }
})
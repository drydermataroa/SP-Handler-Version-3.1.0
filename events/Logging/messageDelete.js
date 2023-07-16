const client = require(`../../index`)
const guilds = require(`../../structures/Models/guild`)
const { MessageEmbed } = require("discord.js")
const emojis = require('../../settings/emojis')
const ec = require('../../settings/embed')
const guild = require("../../structures/Models/guild")

client.on("messageDelete", async (message) => {
    const guild = await guilds.findOne({guildId: message.guild.id})
    if(!guild.logging) return;
    if(!message.guild) return;
    
    if(message.author) {
    const embed = new MessageEmbed()
    .setTitle(`${emojis.bin} **Message Deleted!** ${emojis.bin}`)
    .setColor(ec.color)
    .setDescription(`> **Channel:** <#${message.channel.id}>\n> **Author:** ${message ? `<@${message.author.id}>` : "No author found"}`)
    .addFields(
        {name: "**Message**", value: `\`\`\`${message.content}\`\`\``, inline: true },
    )
    .setTimestamp()

    
    const channel = message.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(channel) {
        channel.send({embeds: [embed]})
    }
}
})
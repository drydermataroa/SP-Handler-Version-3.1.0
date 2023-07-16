const client = require(`../../index`)
const guilds = require(`../../structures/Models/guild`)
const { MessageEmbed } = require("discord.js")
const emojis = require('../../settings/emojis')
const ec = require('../../settings/embed')

client.on("messageUpdate", async (oldMessage, newMessage) => {
    const guild = await guilds.findOne({guildId: newMessage.guild.id})
    if(!guild.logging) return;
    if(!newMessage.guild) return;
    if(newMessage) return;
    if(newMessage.author ? newMessage.author.bot : true) return;

    const embed = new MessageEmbed()
    .setTitle(`Message Edited!`)
    .setColor(ec.color)
    .setDescription(`> **Channel:** <#${newMessage.channel.id}>\n> **Author:** <@${newMessage.author.id}>`)
    .addFields(
        {name: "**Old Message:**", value: `\`\`\`${oldMessage.content}\`\`\``, inline: true },
        {name: "**New Message:**", value: `\`\`\`${newMessage.content}\`\`\``, inline: true }
    )
    .setTimestamp()

    
    const channel = newMessage.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(channel) {
        channel.send({embeds: [embed]})
    }
})
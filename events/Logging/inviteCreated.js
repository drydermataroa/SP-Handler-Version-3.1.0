const client = require(`../../index`)
const guilds = require(`../../structures/Models/guild`)
const { MessageEmbed } = require("discord.js")
const emojis = require('../../settings/emojis')
const ec = require('../../settings/embed')

client.on("inviteCreate", async (invite) => {
    const guild = await guilds.findOne({guildId: invite.guild.id})
    if(!guild.logging) return;
    if(!invite.guild) return;
    
    const embed = new MessageEmbed()
    .setTitle(`${emojis.diamond} **Invite Created!** ${emojis.diamond}`)
    .setColor(ec.color)
    .setDescription(`**Channel:** ${invite.channel ? `<#${invite.channel.id}>` : "No channel found"}
     **Author:** ${invite.inviter ? `<@${invite.inviter.id}>` : "No author"}`)
     .addFields(
         { name: "**Invite Code:**", value: `\`\`\`${invite.code}\`\`\``, inline: true }, 
         { name: "**Max Uses**", value: `\`\`\`${invite.maxUses ? invite.maxUses : "Not defined"}\`\`\``, inline: true },
         { name: "**Expires:**", value: `${invite.expiresTimestamp ? `<t:${Math.floor(invite.expiresTimestamp / 1000)}:f>` : "Not defined"}` },
         { name: "**URL:**", value: `${invite.url}`})
    .setTimestamp()

   
    const channel = invite.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(channel) {
        channel.send({embeds: [embed]})
    }
})
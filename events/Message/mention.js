const client = require("../../index");
const { MessageActionRow, MessageEmbed, MessageButton } = require("discord.js")
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')
const set = require('../../settings/settings')
const config = require('../../settings/config.json')

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

   const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
   if (message.content.match(prefixMention)) {

    const embed = new MessageEmbed()
    .setTitle(`${emojis.barchart} **Prefix Mentioned** ${emojis.barchart}`)
    .setColor(ec.color)
    .setDescription(`Hey **${message.author.username},** I was made by ${set.botOwner} 
    Bot Prefix: \`${config.prefix}\` 
Forgot My Prefix? Dw you can always mention me to check my prefix
    Invite Link: [Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) Still need help? [Click Here](${set.supportInvite}) to join server
    `)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()

    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel('Invite Me')
        .setStyle('LINK')
        .setEmoji(emojis.bot)
        .setURL(set.botInvite),
        new MessageButton()
        .setLabel('Support Server')
        .setStyle('LINK')
        .setEmoji(emojis.clipboard)
        .setURL(set.guildInvite)
    ) 

    message.channel.send({embeds: [embed], components: [row]})
   }
})
const { Client, Message, MessageEmbed } = require('discord.js');
const ec = require("../../settings/embed");

module.exports = {
    name: 'membercount',
    description: "Counts all members & bots in the server.",
    emoji: "🎗️",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const guild = message;
        const embed = new MessageEmbed()
        .setColor(ec.color)
        .setAuthor({ name: `Member Count of ${message.guild}`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setTitle("Members")
        .setDescription (`Total: ${message.guild.members.cache.size}\n Members: ${message.guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setImage(ec.image)
        .setFooter({ text: ` • Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL() })
        .setTimestamp()
       
            message.channel.send({ embeds: [embed]})
  }
}
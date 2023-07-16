const { MessageEmbed } = require('discord.js');
const ec = require("../../settings/embed")

module.exports = {
    name: 'server',
    description: "Get the owner info of the current server.",
    emoji: "🏆",
    
    run: async(client, message, args) => {

        let Embed = new MessageEmbed()
            .setColor(ec.color)
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`Owner: <@${message.guild.ownerId}> | ${message.guild.ownerId}\nMembers: ${message.guild.memberCount}\nCreated at: ${message.guild.createdAt.toLocaleString()}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setImage(message.guild.iconURL({ dynamic: true }))

        message.reply({ embeds: [Embed] });

    }
}
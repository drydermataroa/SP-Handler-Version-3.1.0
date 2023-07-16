const { Client, Message, MessageEmbed } = require('discord.js');
const ec = require("../../settings/embed")

module.exports = {
  
    name: 'badges',
    category: 'info',
    description: "Badge Info",
    emoji: '🛡️',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const flags = user.flags.toArray();

        console.log(flags);

        const bad = new MessageEmbed()
        .setTitle(`Users Badges`)
        .setColor(ec.color)
        .setDescription(`${user}'s badges: ${flags.join(', ')}`)
        .setTimestamp()
        
        message.channel.send({ embeds: [bad]})
    }
}
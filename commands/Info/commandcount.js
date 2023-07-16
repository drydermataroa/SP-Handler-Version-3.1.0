const { Client, Message, MessageEmbed } = require("discord.js")
const ec = require("../../settings/embed")

module.exports = {
    name: "commandcount",
    description: "See how many commands there are!",
    category: "Information",
    emoji: "⌛",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        let total = 0
        client.commands.each((c) => total++)

        const count = new MessageEmbed()
        .setTitle('Prefix Command Count')
        .setColor(ec.color)
        .setDescription(`✅ • There are currently **${total}** commands!`)
        .setTimestamp()

        message.reply({ embeds: [count]})
    }
}
const { MessageEmbed } = require("discord.js");
const eco = require("../../structures/Models/Economy");
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

module.exports = {
    name: "removemoney",
    description: "🎉 | Removey money from a user",
    category: "Economy",
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            name: "user",
            description: "Mention a user which you want to remove money from",
            type: "USER",
            required: true,
        },
        {
            name: "amount",
            description: "Give amount",
            type: "NUMBER",
            required: true,
        },
    ],
    run: async (client, interaction, args) => {
        const { guild, options, member } = interaction;

        let target = options.getUser("user") || member
        let amount = options.getNumber("amount") || 1
        eco.balance.subtract(amount, target.id, guild.id)

        const embed = new MessageEmbed()
        .setTitle(`${emojis.coin} **Succesfully Removed** ${emojis.coin}`)
        .setDescription(`Removed ${amount} coins from ${target}`)
        .setColor(ec.color)
        .setFooter({
            text: `Requested by ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL({
             dynamic: true,
             format: "png",
             size: 2048,
            }),
           })
        .setTimestamp()

        interaction.followUp({embeds: [embed]})
    }
}
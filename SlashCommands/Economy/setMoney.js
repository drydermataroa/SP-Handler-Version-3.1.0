const { MessageEmbed } = require("discord.js");
const eco = require("../../structures/Models/Economy");
const ec = require('../../settings/embed')
const emojis = require('../../settings/emojis')

module.exports = {
    name: "setmoney",
    description: "💎 | Set user's money",
    category: "Economy",
    userPermissions: ['ADMINISTRATOR'],
    options: [
        {
            name: "user",
            description: "Mention a user which you want to give money to",
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
        eco.balance.set(amount, target.id, guild.id)

        const setEmbed = new MessageEmbed()
        .setTitle(`${emojis.money} **Coins Succesfully Set** ${emojis.money}`)
        .setDescription(`Set **${target}'s** balance to ${amount} coins`)
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

        interaction.followUp({embeds: [setEmbed]})
    }
} 